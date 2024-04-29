package readit.viewer.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import readit.viewer.exception.JsonParsingException;
import readit.viewer.exception.ValueMissingException;
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

    @Transactional(readOnly = true)
    public WordListResponse loadArticle(Integer articleId) {
        // 글 불러오기
        Article article = articleRepository.getReferenceById(articleId);
        log.info(article.toString());

        // 어려운 단어 저장되어 있는지 확인
        if (!article.getHasWord()) {
            List<GPTMessage> messages = new ArrayList<>();
            // 어려운 단어가 없으면 chatgpt한테 요청하기
            messages.add(
                    GPTMessage.of(
                    "user",
                    buildPromptMessageForDifficultWord(article)));

            // ChatGPT 프롬프트 요청 및 응답 받아옴
            WordListResponse wordListResponse = new WordListResponse(gptUtil.prompt(messages));

            // 어려운 단어 DB에 저장
            try {
                // todo: object mapper singleton으로 변경
                ObjectMapper om = new ObjectMapper();
                String jsonData = om.writeValueAsString(wordListResponse);
                articleRepository.updateWordsByArticleId(article.getId(), jsonData);
                articleRepository.updateHasWordToTrue(article.getId());
            } catch (JsonProcessingException e) {
                throw new JsonParsingException();
            }

            return wordListResponse;
        } else {
            return new WordListResponse(new ArrayList<>());
        }
    }

    public Word dictionarySearch(String keyword) {
        return dictionaryUtil.search(keyword);
    }

    public void saveTemp(Integer articleId, Integer memberId, TempSaveRequest request) {
        // 읽은 글에 있는 지 확인
        Optional<MemberArticle> optionalMemberArticle = memberArticleRepository.findMemberArticleByArticleIdAndMemberId(articleId, memberId);

        // 이미 읽은 글이면 기존 데이터에 업데이트
        if (optionalMemberArticle.isPresent()) {
            // 요약 저장
            memberArticleRepository.updateSummaryById(optionalMemberArticle.get().getId(), request.summary());
            // 메모 저장
            saveMemo(optionalMemberArticle.get(), request.memoList());

            log.info("--- 삐빅 이미 저장했던 글입니다---");
        } else {
            Optional<Article> optionalArticle = Optional.ofNullable(articleRepository.findById(articleId)
                    .orElseThrow(() -> new ValueMissingException()));

            // 읽은 글에 없으면 요약 포함해서 새로 저장
            Article article = optionalArticle.get();
            MemberArticle newMemberArticle = MemberArticle.create(article, memberId, request.summary());
            MemberArticle saveMemberArticle = memberArticleRepository.save(newMemberArticle);

            // 메모 저장
            saveMemo(saveMemberArticle, request.memoList());

            log.info("--- 삐빅 처음 저장하는 글입니다 ---");
        }
    }

    private void saveMemo(MemberArticle memberArticle, List<Memo> memoList) {
        for (Memo memo : memoList) {
            memo.includeMemberArticle(memberArticle);
        }
        memoRepository.saveAll(memoList);
    }

    private String buildPromptMessageForDifficultWord(Article article) {
        StringBuilder sb = new StringBuilder();
        sb.append(article.getContent());
        sb.append("이 글에서 초등학생이 이해하기 어려운 단어와 뜻 목록을 추출해줘.");
        sb.append("그리고 강조 기호 없이 텍스트로만 줘.");
        sb.append("그리고 '번호. 단어: 뜻' 형태로 답해줘.");
        return sb.toString();
    }
}
