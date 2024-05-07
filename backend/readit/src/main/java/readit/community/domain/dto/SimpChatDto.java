package readit.community.domain.dto;

import java.time.LocalDateTime;
import readit.community.domain.entity.Chat;

public record SimpChatDto(
        String memberName,
        String memberProfile,
        String content,
        LocalDateTime createdAt
) {
    public static SimpChatDto from(Chat chat) {

        return new SimpChatDto(
                chat.getMember().getName(),
                chat.getMember().getProfile(),
                chat.getContent(),
                chat.getCreatedAt()
        );
    }
}
