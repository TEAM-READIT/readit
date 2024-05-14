package readit.article.dto.response;

import readit.viewer.domain.dto.Word;
import readit.viewer.domain.entity.MemberArticle;

public record GetWordResponse(
        String word,
        String definition
) {
    public static GetWordResponse from(Word word){
            return new GetWordResponse(
                    word.word(),
                    word.definition()
            );
    }
}
