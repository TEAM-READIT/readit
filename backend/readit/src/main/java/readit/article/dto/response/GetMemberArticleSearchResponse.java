package readit.article.dto.response;

import readit.article.dto.Page;
import readit.viewer.domain.entity.MemberArticle;
import java.util.List;
import static java.util.stream.Collectors.toList;

public record GetMemberArticleSearchResponse(
        List<GetMemberArticleResponse> articleList,
        Boolean hasNext
){
    public static GetMemberArticleSearchResponse from(Page<MemberArticle> articles){
        List<GetMemberArticleResponse> articleResponses = articles.stream()
                .map(GetMemberArticleResponse::from)
                .collect(toList());
        return new GetMemberArticleSearchResponse(articleResponses,articles.hasNext);
    }
}
