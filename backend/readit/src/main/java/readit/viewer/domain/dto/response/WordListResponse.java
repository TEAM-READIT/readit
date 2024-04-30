package readit.viewer.domain.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import readit.viewer.domain.dto.Word;

import java.util.List;

public record WordListResponse(
        List<Word> wordList
) {
    public String toJsonString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException();
        }
    }
}
