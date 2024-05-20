package readit.article.dto.response;

import readit.viewer.domain.entity.MemberArticle;

import java.util.List;

public record GetRecentMemberArticlesResponse(
        List<GetMemberArticleResponse> articleList
) {
    public static GetRecentMemberArticlesResponse from(List<MemberArticle> articleList){
        List<GetMemberArticleResponse> articleResponses = articleList.stream()
                .map(GetMemberArticleResponse::from).toList();
        return new GetRecentMemberArticlesResponse(articleResponses);
    }
}
