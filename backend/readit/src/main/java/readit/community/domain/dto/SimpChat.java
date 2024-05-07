package readit.community.domain.dto;

import readit.community.domain.entity.Chat;

import java.time.LocalDateTime;

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
