package readit.viewer.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import readit.article.domain.Article;
import readit.article.domain.repository.ArticleRepository;
import readit.viewer.domain.dto.GPTMessage;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.response.WordListResponse;

import java.util.ArrayList;
import java.util.List;
import readit.viewer.util.DictionaryUtil;
import readit.viewer.util.GPTUtil;

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

        // todo: 어려운 단어가 있는 지 체크 (hasWord)
        if (article.getHasWord()) {
            // todo: 어려운 단어가 있으면 그대로 불러 오기


        } else {
            // todo: 어려운 단어가 없으면 chatgpt한테 요청하기

            StringBuilder sb = new StringBuilder();
            sb.append(article.getContent());
            sb.append("이 글에서 초등학생이 이해하기 어려운 단어와 뜻 목록을 추출해줘.");
            sb.append("그리고 강조 기호 없이 텍스트로만 줘.");
            sb.append("그리고 '번호. 단어: 뜻' 형태로 답해줘.");

            messages.add(GPTMessage.of("user", sb.toString()));

            // todo: 어려운 단어 DB에 저장하기

            return new WordListResponse(gptUtil.prompt(messages));
        }

        // todo: 지우기
        return new WordListResponse(gptUtil.prompt(messages));
    }

    public Word dictionarySearch(String keyword) {
        return dictionaryUtil.search(keyword);
    }
}
