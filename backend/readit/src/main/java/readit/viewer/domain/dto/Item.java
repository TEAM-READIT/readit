package readit.viewer.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class Item {
    @JsonProperty("sup_no")
    private String supNo;
    private String word;
    @JsonProperty("target_code")
    private String targetCode;
    private Sense sense;
    private String pos;
}
