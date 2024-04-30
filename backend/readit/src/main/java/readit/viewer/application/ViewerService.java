package readit.viewer.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.repository.ArticleRepository;
import readit.viewer.domain.dto.GPTMessage;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.request.TempSaveRequest;
import readit.viewer.domain.dto.response.WordListResponse;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.entity.Memo;
import readit.viewer.domain.repository.MemberArticleRepository;
import readit.viewer.domain.repository.MemoRepository;
import readit.viewer.util.DictionaryUtil;
import readit.viewer.util.GPTUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public WordListResponse loadArticleWithWords(Integer articleId) {
        Article article = articleRepository.getReferenceById(articleId);

        // 어려운 단어 저장되어 있는지 확인
        if (article.getHasWord()) {
            return new WordListResponse(new ArrayList<>());
        }
        return getDifficultWords(article);
    }

    // 어려운 단어가 없으면 chatgpt한테 요청하기
    private WordListResponse getDifficultWords(Article article) {
        List<GPTMessage> messages = new ArrayList<>();
        messages.add(GPTMessage.of("user", buildPromptMessageForDifficultWord(article.getContent())));
        List<Word> response = gptUtil.prompt(messages);

        WordListResponse wordListResponse = new WordListResponse(response);
        saveWords(article, wordListResponse);

        return wordListResponse;
    }

    // 어려운 단어 DB에 저장
    private void saveWords(Article article, WordListResponse wordListResponse) {
        String jsonData = wordListResponse.toJsonString();
        articleRepository.updateWordsByArticleId(article.getId(), jsonData);
        articleRepository.updateHasWordToTrue(article.getId());
    }

    // 단어 사전 검색
    public Word dictionarySearch(String keyword) {
        return dictionaryUtil.search(keyword);
    }

    // 임시 저장
    public void saveTemp(Integer articleId, Integer memberId, TempSaveRequest request) {
        // 읽은 글에 있는 지 확인
        Optional<MemberArticle> optionalMemberArticle = memberArticleRepository.findMemberArticleByArticleIdAndMemberId(articleId, memberId);

        // 이미 읽은 글이면 기존 데이터에 업데이트
        if (optionalMemberArticle.isPresent()) {
            log.info("--- 삐빅 이미 저장했던 글입니다---");
            // 요약, 메모 저장
            memberArticleRepository.updateSummaryById(optionalMemberArticle.get().getId(), request.summary());
            saveMemo(optionalMemberArticle.get(), request.memoList());

        } else {
            log.info("--- 삐빅 처음 저장하는 글입니다 ---");
            Optional<Article> optionalArticle = Optional.ofNullable(articleRepository.findById(articleId)
                    .orElseThrow(IllegalArgumentException::new));

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
}
