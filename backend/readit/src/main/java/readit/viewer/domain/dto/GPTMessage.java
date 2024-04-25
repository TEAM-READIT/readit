package readit.viewer.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GPTMessage {
    private String role;
    private String content;
}
