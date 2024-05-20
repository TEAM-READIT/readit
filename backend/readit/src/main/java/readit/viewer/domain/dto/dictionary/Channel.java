package readit.viewer.domain.dto.dictionary;

import com.fasterxml.jackson.annotation.JsonProperty;
import readit.viewer.domain.dto.gpt.Item;

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
