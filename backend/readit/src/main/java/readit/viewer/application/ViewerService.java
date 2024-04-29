package readit.viewer.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import readit.article.domain.Article;
import readit.article.domain.repository.ArticleRepository;
import readit.viewer.domain.dto.GPTMessage;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.response.WordListResponse;
import readit.viewer.exception.JsonParsingException;
import readit.viewer.util.DictionaryUtil;
import readit.viewer.util.GPTUtil;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ViewerService {
    private final ArticleRepository articleRepository;
    private final GPTUtil gptUtil;
    private final DictionaryUtil dictionaryUtil;

    public WordListResponse loadArticle(Integer articleId) {
        // todo: 사용자가 읽은 글을 눌렀는지 안 읽은 글을 눌렀는지 체크 (-> memberArticleRepository)
        // todo: 읽은 글이면 읽은 글에서 메모까지 묶어서 불러 오기


        // 일단 안 읽은 글이라고 가정
        Article article = articleRepository.getReferenceById(articleId);
        log.info(article.toString());
        List<GPTMessage> messages = new ArrayList<>();

        // 어려운 단어 저장되어 있는지 확인
        if (!article.getHasWord()) {
            // 어려운 단어가 없으면 chatgpt한테 요청하기

            StringBuilder sb = new StringBuilder();
            sb.append(article.getContent());
            sb.append("이 글에서 초등학생이 이해하기 어려운 단어와 뜻 목록을 추출해줘.");
            sb.append("그리고 강조 기호 없이 텍스트로만 줘.");
            sb.append("그리고 '번호. 단어: 뜻' 형태로 답해줘.");

            messages.add(GPTMessage.of("user", sb.toString()));

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
        }

        // todo: 지우기
        return new WordListResponse(gptUtil.prompt(messages));
    }

    public Word dictionarySearch(String keyword) {
        return dictionaryUtil.search(keyword);
    }
}
