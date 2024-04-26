package readit.viewer.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record Channel (
        Integer total,
        Integer num,
        String title,
        Integer start,
        String description,
        Item[] item,
        String link,
        @JsonProperty("lastbuilddate") String lastBuildDate
) {
}
