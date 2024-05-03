package readit.community.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.community.domain.dto.GetCreateCommunityRequest;
import readit.community.domain.entity.Community;
import readit.community.domain.entity.Participants;
import readit.community.domain.repository.CommunityRepository;
import readit.community.domain.repository.ParticipantsRepository;
import readit.community.exception.AlreadyJoinedCommunityException;
import readit.community.exception.CommunityFullException;
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

}
