package readit.viewer.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Usage {
    private int prompt_tokens;
    private int completion_tokens;
    private int total_tokens;
}