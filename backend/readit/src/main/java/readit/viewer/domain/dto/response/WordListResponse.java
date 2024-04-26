package readit.viewer.domain.dto.response;

import readit.viewer.domain.dto.Word;
import java.util.List;

public record WordListResponse(
        List<Word> wordList
) {
}
