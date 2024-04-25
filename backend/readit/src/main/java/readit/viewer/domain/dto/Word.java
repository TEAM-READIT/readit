package readit.viewer.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Word {
    private String word;
    private String definition;
}
