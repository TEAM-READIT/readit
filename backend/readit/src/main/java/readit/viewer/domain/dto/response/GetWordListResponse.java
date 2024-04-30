package readit.viewer.domain.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import readit.viewer.domain.dto.Word;
import readit.viewer.exception.JsonParsingException;

import java.util.List;

public record GetWordListResponse(
        List<Word> wordList
) {
    public String toJsonString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new JsonParsingException();
        }
    }
}
