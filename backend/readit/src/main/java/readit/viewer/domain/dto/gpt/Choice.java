package readit.viewer.domain.dto.gpt;

import lombok.Getter;

import java.util.Map;

@Getter
public class Choice {
    private int index;
    private Map<String, Object> message;
    private Object logprobs;
    private String finish_reason;
}