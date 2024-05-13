package readit.community.domain.dto;

import readit.community.domain.entity.Chat;

import java.time.LocalDateTime;

public record SimpChat(
        Integer memberId,
        String memberName,
        String memberProfile,
        String content,
        LocalDateTime createdAt
) {
    public static SimpChat from(Chat chat) {

        return new SimpChat(
                chat.getParticipant().getMember().getId(),
                chat.getParticipant().getMember().getName(),
                chat.getParticipant().getMember().getProfile(),
                chat.getContent(),
                chat.getCreatedAt()
        );
    }
}
