package readit.article.dto.response;

import readit.viewer.domain.entity.MemberArticle;

import java.util.List;

import static java.util.stream.Collectors.toList;

public record GetMemberArticleListResponse(
        List<GetMemberArticleResponse> articleList
) {
    public static GetMemberArticleListResponse from(List<MemberArticle> memberArticles){
        List<GetMemberArticleResponse> articleResponses = memberArticles.stream()
                .map(GetMemberArticleResponse::from).collect(toList());
        return new GetMemberArticleListResponse(articleResponses);
    }
}
