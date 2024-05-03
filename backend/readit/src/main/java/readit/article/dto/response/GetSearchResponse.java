package readit.article.dto.response;

import readit.article.domain.Article;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.entity.Memo;

import java.util.List;

import static java.util.stream.Collectors.toList;

public record GetSearchResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        String reporter,
        Integer hit,
        List<GetMemoResponse> memoList
) {
    public static GetSearchResponse from(Object obj,List<Memo> memos){
        if (obj instanceof Article article) {
            return new GetSearchResponse(
                    article.getId(),
                    article.getTitle(),
                    article.getContent(),
                    article.getType().name(),
                    article.getCategory().getName(),
                    article.getReporter(),
                    article.getHit(),
                    null
            );
        } else {
            MemberArticle memberArticle = (MemberArticle) obj;
            return new GetSearchResponse(
                    memberArticle.getId(),
                    memberArticle.getArticle().getTitle(),
                    memberArticle.getArticle().getContent(),
                    memberArticle.getArticle().getType().name(),
                    memberArticle.getArticle().getCategory().getName(),
                    memberArticle.getArticle().getReporter(),
                    memberArticle.getArticle().getHit(),
                    memos.stream()
                            .map(GetMemoResponse::from)
                            .collect(toList())
            );
        }
    }
}
