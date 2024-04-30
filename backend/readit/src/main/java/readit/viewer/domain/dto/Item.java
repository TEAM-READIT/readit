package readit.viewer.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record Item(
        @JsonProperty("sup_no")
        String supNo,
        String word,
        @JsonProperty("target_code")
        String targetCode,
        Sense sense,
        String pos
) {

}
