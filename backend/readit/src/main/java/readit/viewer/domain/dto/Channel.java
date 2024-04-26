package readit.viewer.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class Channel {
    private int total;
    private int num;
    private String title;
    private int start;
    private String description;
    private Item[] item;
    private String link;
    @JsonProperty("lastbuilddate")
    private String lastBuildDate;
}
