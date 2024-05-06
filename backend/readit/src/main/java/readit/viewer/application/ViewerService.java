package readit.viewer.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.repository.ArticleRepository;
import readit.viewer.domain.dto.GPTMessage;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.request.PostTempSaveRequest;
import readit.viewer.domain.dto.response.GetWordListResponse;
import readit.viewer.domain.dto.response.SubmissionResponse;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.entity.Memo;
import readit.viewer.domain.repository.MemberArticleRepository;
import readit.viewer.domain.repository.MemoRepository;
import readit.viewer.exception.AsynchronousException;
import readit.viewer.exception.ValueMissingException;
import readit.viewer.util.DictionaryUtil;
import readit.viewer.util.GPTUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
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
        Article article = articleRepository.getReferenceById(articleId);

        // 어려운 단어 저장되어 있는지 확인
        if (article.getHasWord()) {
            return new GetWordListResponse(new ArrayList<>());
        }
        return getDifficultWords(article);
    }

    // 어려운 단어가 없으면 chatgpt한테 요청하기
    private GetWordListResponse getDifficultWords(Article article) {
        List<GPTMessage> messages = new ArrayList<>();
        messages.add(GPTMessage.of("user", buildPromptMessageForDifficultWord(article.getContent())));

        List<Word> response = null;
        CompletableFuture<List<Word>> future = gptUtil.promptWords(messages);
        try {
            response = future.get();
        } catch (ExecutionException | InterruptedException e) {
            throw new AsynchronousException();
        }

        GetWordListResponse getWordListResponse = GetWordListResponse.from(response);
        saveWords(article, getWordListResponse);

        return getWordListResponse;
    }

    // 어려운 단어 DB에 저장
    private void saveWords(Article article, GetWordListResponse getWordListResponse) {
        String jsonData = getWordListResponse.toJsonString();
        articleRepository.updateWordsByArticleId(article.getId(), jsonData);
        articleRepository.updateHasWordToTrue(article.getId());
    }

    // 단어 사전 검색
    public Word dictionarySearch(String keyword) {
        return dictionaryUtil.search(keyword);
    }

    // 임시 저장
    public void saveTemp(Integer articleId, Integer memberId, PostTempSaveRequest request) {
        // 읽은 글에 있는 지 확인
        Optional<MemberArticle> optionalMemberArticle = memberArticleRepository.findMemberArticleByArticleIdAndMemberId(articleId, memberId);

        // 이미 읽은 글이면 기존 데이터에 업데이트
        if (optionalMemberArticle.isPresent()) {
            // 요약, 메모 저장
            memberArticleRepository.updateSummaryById(optionalMemberArticle.get().getId(), request.summary());
            saveMemo(optionalMemberArticle.get(), request.memoList());

        } else {
            Optional<Article> optionalArticle = Optional.ofNullable(articleRepository.findById(articleId)
                    .orElseThrow(ValueMissingException::new));

            // 읽은 글에 없으면 요약 포함해서 새로 저장
            Article article = optionalArticle.get();
            MemberArticle saveMemberArticle =
                    memberArticleRepository.save(MemberArticle.create(article, memberId, request.summary()));

            // 메모 저장
            saveMemo(saveMemberArticle, request.memoList());
        }
    }

    private void saveMemo(MemberArticle memberArticle, List<Memo> memoList) {
        // 메모에 읽은 글 아이디 포함 시키기
        for (Memo memo : memoList) {
            memo.includeMemberArticle(memberArticle);
        }
        memoRepository.saveAll(memoList);
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

        CompletableFuture<SubmissionResponse> future = gptUtil.promptSummary(buildGPTMessage(promptMessage));

        SubmissionResponse response = null;
        try {
            response = future.get();
        } catch (ExecutionException | InterruptedException e) {
            throw new AsynchronousException();
        }

        Optional<MemberArticle> optionalMemberArticle = Optional.ofNullable(
                memberArticleRepository.findMemberArticleByArticleIdAndMemberId(articleId, memberId)
                .orElseThrow(ValueMissingException::new));

        // 피드백, 점수 저장
        MemberArticle memberArticle = optionalMemberArticle.get();
        memberArticleRepository.updateScoreAndFeedbackById(
                memberArticle.getId(),
                response.score(),
                response.feedback());

        // todo: 결과 받아와서 db에 feedback 저장
        return response;
    }

    private String buildPromptMessageForSummary(String content, String summary) {
        StringBuilder sb = new StringBuilder();
        sb.append("글: ");
        sb.append(content);
        sb.append("\n 위 글에 대해서 아래와 같이 요약했는데 잘 요약했는 지 100점 만점으로 점수를 구하고 잘한점과 못한점을 알려줘. \n");
        sb.append("요약: ");
        sb.append(summary);
        sb.append("\n 점수: xx점 \n 잘한 점: \n 못한 점: \n");
        sb.append("이 형태를 유지해서 답해줘.");
        return sb.toString();
    }

    private List<GPTMessage> buildGPTMessage(String promptMessage) {
        return List.of(GPTMessage.of("user", promptMessage));
    }
}
