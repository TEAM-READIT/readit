package readit.viewer.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.repository.ArticleRepository;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.gpt.GPTMessage;
import readit.viewer.domain.dto.request.GetMemoRequest;
import readit.viewer.domain.dto.request.PostTempSaveRequest;
import readit.viewer.domain.dto.response.GetWordListResponse;
import readit.viewer.domain.dto.response.SubmissionResponse;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.entity.Memo;
import readit.viewer.domain.repository.MemberArticleRepository;
import readit.viewer.domain.repository.MemoRepository;
import readit.viewer.exception.AsynchronousException;
import readit.viewer.util.DictionaryUtil;
import readit.viewer.util.GPTUtil;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ViewerService {
    private final ArticleRepository articleRepository;
    private final MemberArticleRepository memberArticleRepository;
    private final MemoRepository memoRepository;
    private final GPTUtil gptUtil;
    private final DictionaryUtil dictionaryUtil;


    // 뷰어 불러오기
    public GetWordListResponse loadArticleWithWords(Integer articleId) {
        Article article = articleRepository.getById(articleId);
        // 어려운 단어 저장되어 있으면 이미 데이터 있으므로 빈 리스트 반환
        if (article.getHasWord()) {
            return GetWordListResponse.from(new ArrayList<>());
        }
        return getDifficultWords(article);
    }

    // 어려운 단어가 없으면 chatgpt한테 요청하기
    private GetWordListResponse getDifficultWords(Article article) {
        List<GPTMessage> messages = new ArrayList<>();
        messages.add(GPTMessage.of("user", buildPromptMessageForDifficultWord(article.getContent())));
        List<Word> words = requestDifficultWords(messages);
        GetWordListResponse getWordListResponse = GetWordListResponse.from(words);
        saveWords(article, getWordListResponse);
        return getWordListResponse;
    }

    private List<Word> requestDifficultWords(List<GPTMessage> messages) {
        try {
            return gptUtil.promptWords(messages).get();
        } catch (ExecutionException | InterruptedException e) {
            throw new AsynchronousException();
        }
    }

    // 어려운 단어 DB에 저장
    private void saveWords(Article article, GetWordListResponse getWordListResponse) {
        article.updateDifficultWords(getWordListResponse.toJsonString(), true);
        articleRepository.save(article);
    }

    // 단어 사전 검색
    public Word dictionarySearch(String keyword) {
        return dictionaryUtil.search(keyword);
    }

    // 임시 저장
    public void saveTemp(Integer articleId, Integer memberId, PostTempSaveRequest request) {
        // 읽은 글에 있는 지 확인
        Optional<MemberArticle> optionalMemberArticle =
                memberArticleRepository.findMemberArticleByArticleIdAndMemberId(articleId, memberId);

        // 이미 읽은 글이면 기존 데이터에 업데이트
        if (optionalMemberArticle.isPresent()) {
            MemberArticle memberArticle = optionalMemberArticle.get();
            memberArticle.updateForSaveTemp(request);
            updateMemo(memberArticle,request);

            memberArticleRepository.save(memberArticle);
        } else { // 읽은 글에 없으면 요약 포함해서 새로 저장
            Article article = articleRepository.getById(articleId);
            MemberArticle memberArticle = memberArticleRepository.save(MemberArticle.create(article, memberId, request));
            request.memoList().stream()
                    .map(m-> GetMemoRequest.toEntity(m,memberArticle))
                    .forEach(memoRepository::save);
        }
    }

    private void updateMemo(MemberArticle memberArticle, PostTempSaveRequest request){
        List<Memo> prevMemoList = memoRepository.findByMemberArticleId(memberArticle.getId());
        Optional.ofNullable(prevMemoList).ifPresent(memoList -> {
            memoList.forEach(memoRepository::delete);
        });
        Optional.ofNullable(request.memoList()).ifPresent(memoList -> {
            memoList.stream()
                    .map(m -> GetMemoRequest.toEntity(m, memberArticle))
                    .forEach(memoRepository::save);
        });
    }

    private String buildPromptSystemMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append("너는 한국어를 굉장히 잘하고 문해력이 뛰어난 국어 선생님이야.");
        sb.append("앞으로 내가 요청하는 것들에 대한 정확한 평가를 해야해. ");
        return sb.toString();
    }

    private String buildPromptMessageForDifficultWord(String content) {
        StringBuilder sb = new StringBuilder();
        sb.append(content);
        sb.append("이 글에서 초등학생이 이해하기 어려운 단어와 뜻 목록을 추출해줘.");
        sb.append("그리고 강조 기호 없이 텍스트로만 줘.");
        sb.append("그리고 '번호. 단어: 뜻' 형태로 답해줘.");
        return sb.toString();
    }

    public SubmissionResponse submitSummary(Integer articleId, Integer memberId, String summary) {
        Article article = articleRepository.getReferenceById(articleId);
        String promptMessage = buildPromptMessageForSummary(article.getContent(), summary);
        SubmissionResponse response = requestSummary(buildGPTMessage(promptMessage));
        // 피드백, 점수 저장
        MemberArticle memberArticle = memberArticleRepository.getByArticleIdAndMemberId(articleId, memberId);
        memberArticle.updateWhenComplete(LocalDateTime.now(), response.score(), response.feedback());
        memberArticleRepository.save(memberArticle);
        return response;
    }

    private String buildPromptMessageForSummary(String content, String summary) {
        StringBuilder sb = new StringBuilder();
        sb.append("\n 다음 글에 대한 요약을 해봤어. 100점 만점으로 점수를 구하고 잘한점과 못한점을 알려줘. \n");
        sb.append("\n 점수: xx점 \n 잘한 점: \n 못한 점: \n");
        sb.append("이 형태를 유지해서 답해줘. \n \n");
        sb.append("글: ");
        sb.append(content);
        sb.append("\n 요약: ");
        sb.append("[" + summary + "] \n");
        sb.append("[] 안에 내용이 없으면 0점을 줘도 괜찮아");
        log.info(sb.toString());
        return sb.toString();
    }

    private List<GPTMessage> buildGPTMessage(String promptMessage) {
        List<GPTMessage> gptMessages = new ArrayList<>();
        gptMessages.add(GPTMessage.of("system", buildPromptSystemMessage()));
        gptMessages.add(GPTMessage.of("user", promptMessage));
        return gptMessages;
    }

    private SubmissionResponse requestSummary(List<GPTMessage> messages) {
        try {
            return gptUtil.promptSummary(messages).get();
        } catch (ExecutionException | InterruptedException e) {
            throw new AsynchronousException();
        }
    }
}
