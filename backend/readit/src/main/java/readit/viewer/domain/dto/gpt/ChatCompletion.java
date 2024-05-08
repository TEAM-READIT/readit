package readit.viewer.domain.dto.gpt;

import lombok.Getter;
import java.util.List;
import readit.viewer.domain.dto.gpt.Choice;
import readit.viewer.domain.dto.gpt.Usage;

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