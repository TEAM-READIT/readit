package readit.community.domain.dto;

import java.time.LocalDateTime;
import readit.community.domain.entity.Chat;

public record SimpChat(
        String memberName,
        String memberProfile,
        String content,
        LocalDateTime createdAt
) {
    public static SimpChat from(Chat chat) {

        return new SimpChat(
                chat.getMember().getName(),
                chat.getMember().getProfile(),
                chat.getContent(),
                chat.getCreatedAt()
        );
    }
}
