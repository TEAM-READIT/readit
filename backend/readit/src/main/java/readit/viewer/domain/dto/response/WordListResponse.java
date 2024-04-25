package readit.viewer.domain.dto.response;

import lombok.Builder;
import lombok.Getter;
import readit.viewer.domain.dto.Word;
import java.util.List;

@Builder
@Getter
public class WordListResponse {
    private List<Word> wordList;
}
