package readit.community.domain.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import readit.community.domain.entity.Chat;
import readit.member.domain.Member;

@Builder
public record SimpChatDto(
        String memberName,
        String memberProfile,
        String content,
        LocalDateTime createdAt
) {
    public static SimpChatDto from(Chat chat) {
        return SimpChatDto.builder()
                .memberName(chat.getMember().getName())
                .memberProfile(chat.getMember().getProfile())
                .content(chat.getContent())
                .createdAt(chat.getCreatedAt())
                .build();
    }
}
