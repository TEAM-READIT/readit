package readit.article.dto.response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import readit.article.domain.Article;
import readit.article.util.JsonUtil;
import readit.viewer.domain.dto.Word;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

public record GetArticleResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        Integer hit,
        String reporter,
        List<Word> words
) {
    public static GetArticleResponse from(Article article) {
        List<Word> words = Optional.ofNullable(article.getWords())
                .map(wordsJson -> JsonUtil.toList(JsonUtil.toJson(wordsJson),
                        wordObj -> new Word((String) wordObj.get("word"), (String) wordObj.get("definition"))))
                .orElse(new ArrayList<>());

        return new GetArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getType().toString(),
                article.getCategory().getName(),
                article.getHit(),
                article.getReporter(),
                words
        );
    }
}
