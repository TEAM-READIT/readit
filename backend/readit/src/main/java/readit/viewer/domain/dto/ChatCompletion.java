package readit.viewer.domain.dto;

import lombok.Getter;
import java.util.List;

@Getter
public class ChatCompletion {
    private String id;
    private String object;
    private long created;
    private String model;
    private List<Choice> choices;
    private Usage usage;
    private String system_fingerprint;
}