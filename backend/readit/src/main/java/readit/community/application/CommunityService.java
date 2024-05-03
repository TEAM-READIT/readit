package readit.community.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.community.domain.dto.request.GetCreateCommunityRequest;
import readit.community.domain.dto.request.PostChatRequest;
import readit.community.domain.entity.Chat;
import readit.community.domain.entity.Community;
import readit.community.domain.entity.Participants;
import readit.community.domain.repository.ChatRepository;
import readit.community.domain.repository.CommunityRepository;
import readit.community.domain.repository.ParticipantsRepository;
import readit.community.exception.AlreadyJoinedCommunityException;
import readit.community.exception.CommunityFullException;
import readit.community.exception.DeletionFailedException;
import readit.member.domain.Member;
import readit.member.domain.repository.MemberRepository;
import readit.viewer.exception.ValueMissingException;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final ParticipantsRepository participantsRepository;
    private final MemberRepository memberRepository;
    private final ChatRepository chatRepository;

    public void createCommunity(GetCreateCommunityRequest request, Integer memberId) {
        Community community = communityRepository.save(GetCreateCommunityRequest.toEntity(request, memberId));
        Optional<Member> optionalMember = Optional.ofNullable(memberRepository.findById(memberId)
                .orElseThrow(ValueMissingException::new));
        Participants participants = Participants.create(community, optionalMember.get());
        participantsRepository.save(participants);
    }

    public void joinCommunity(Integer communityId, Integer memberId) {
        Optional<Community> optionalCommunity = Optional.ofNullable(communityRepository.findById(communityId)
                .orElseThrow(ValueMissingException::new));

        Community community = optionalCommunity.get();

        // 이미 가입한 커뮤니티일 때
        if (participantsRepository.findByMemberIdAndCommunityId(memberId, communityId).isPresent()) {
            throw new AlreadyJoinedCommunityException();
        }

        // 최대 정원보다 적을 때
        if (community.getParticipants().size() < community.getMaxParticipants()) {
            Optional<Member> optionalMember = Optional.ofNullable(memberRepository.findById(memberId)
                    .orElseThrow(ValueMissingException::new));
            Member member = optionalMember.get();
            Participants participants = community.joinParticipant(member);
            participantsRepository.save(participants);
        } else {
            throw new CommunityFullException();
        }
    }

    public void leaveCommunity(Integer communityId, Integer memberId) {
        if (participantsRepository.deleteByMemberIdAndCommunityId(memberId, communityId) != 1) {
            throw new DeletionFailedException();
        };
        // todo: 커뮤니티 삭제 기능 구현 or 정원 0명 되면 자동 삭제
    }

    public void sendChat(PostChatRequest request, Integer memberId) {
        Optional<Community> optionalCommunity = Optional.ofNullable(communityRepository.findById(request.communityId())
                .orElseThrow(ValueMissingException::new));
        Optional<Member> optionalMember = Optional.ofNullable(memberRepository.findById(memberId)
                .orElseThrow(ValueMissingException::new));

        chatRepository.save(Chat.create(optionalCommunity.get(), optionalMember.get(), request.content()));
    }

}
