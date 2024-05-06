package readit.community.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.community.domain.dto.ArticleDetail;
import readit.community.domain.dto.CommunityDetail;
import readit.community.domain.dto.CommunityDetailArticle;
import readit.community.domain.dto.CommunityDetailMember;
import readit.community.domain.dto.MyCommunityDetail;
import readit.community.domain.dto.SimpChatDto;
import readit.community.domain.dto.request.GetCreateCommunityRequest;
import readit.community.domain.dto.request.PostChatRequest;
import readit.community.domain.dto.response.GetCommunityDetailResponse;
import readit.community.domain.dto.response.GetHotCommunityResponse;
import readit.community.domain.dto.response.GetMyCommunityResponse;
import readit.community.domain.entity.Chat;
import readit.community.domain.entity.Community;
import readit.community.domain.entity.Participants;
import readit.community.domain.repository.ChatRepository;
import readit.community.domain.repository.CommunityRepository;
import readit.community.domain.repository.ParticipantsRepository;
import readit.community.exception.AlreadyJoinedCommunityException;
import readit.community.exception.CommunityFullException;
import readit.community.exception.DeletionFailedException;
import readit.community.util.DateUtil;
import readit.member.domain.Member;
import readit.member.domain.repository.MemberRepository;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.repository.MemberArticleRepository;
import readit.viewer.exception.ValueMissingException;

import java.time.LocalDateTime;
import java.util.List;
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
    private final MemberArticleRepository memberArticleRepository;
    private final DateUtil dateUtil;

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

    @Transactional(readOnly = true)
    public GetCommunityDetailResponse getCommunityDetail(Integer communityId, Integer memberId) {
        Optional<Community> optionalCommunity = Optional.ofNullable(communityRepository.findById(communityId)
                .orElseThrow(ValueMissingException::new));
        Community community = optionalCommunity.get();

        Optional<Member> optionalWriterMember = Optional.ofNullable(memberRepository.findById(community.getWriterId())
                .orElseThrow(ValueMissingException::new));

        LocalDateTime[] thisWeek = dateUtil.getCurrentWeek();
        List<CommunityDetailMember> memberList = community.getParticipants().stream()
                .map(participant -> {
                    Member member = participant.getMember();
                    int readCount = memberArticleRepository.countByCommunityIdAndMemberIdAndCompletedAtBetween(communityId, member.getId(), thisWeek[0], thisWeek[1]);
                    return CommunityDetailMember.of(member, readCount);
                })
                .toList();

        List<MemberArticle> memberArticles = memberArticleRepository.findByCommunityIdAndCompletedAtBetween(communityId, thisWeek[0], thisWeek[1]);

        List<CommunityDetailArticle> articleList = memberArticles.stream()
                .map(memberArticle -> {
                    // MemberArticle에서 memberId 가져오기
                    Integer communityMemberId = memberArticle.getMemberId();

                    // memberList에서 해당 memberId에 해당하는 CommunityDetailMember 찾기
                    CommunityDetailMember matchingMember = memberList.stream()
                            .filter(member -> member.memberId().equals(communityMemberId))
                            .findFirst()
                            .orElseThrow(ValueMissingException::new);

                    ArticleDetail articleDetail = ArticleDetail.from(memberArticle);
                    // CommunityDetailArticle 생성
                    return CommunityDetailArticle.of(matchingMember, articleDetail);
                })
                .toList();

        // currentParticipants : Participants에서 현재 사이즈 가져오기
        int currentParticipants = community.getParticipants().size();

        // chatList 가져오기
        List<SimpChatDto> simpChatDtoList = chatRepository.findAllByCommunityId(communityId)
                .stream()
                .map(SimpChatDto::from)
                .toList();

        return GetCommunityDetailResponse.of(community,
                memberId,
                optionalWriterMember.get(),
                memberList,
                articleList,
                simpChatDtoList);
    }

    @Transactional(readOnly = true)
    public GetHotCommunityResponse getHotCommunityList() {
        List<Community> communityList = communityRepository.findTop8ByOrderByHitsDesc();

        List<CommunityDetail> communityDetailList = communityList.stream()
                .map(community -> {
                    Member member = memberRepository.findById(community.getWriterId())
                            .orElseThrow(ValueMissingException::new);
                    return CommunityDetail.of(member, community);
                })
                .toList();

        return GetHotCommunityResponse.builder()
                .communityList(communityDetailList)
                .build();
    }

    @Transactional(readOnly = true)
    public GetMyCommunityResponse getMyCommunityList(Integer memberId) {
        List<Community> communityList = communityRepository.findAllByMemberId(memberId);
        List<MyCommunityDetail> myCommunityList = communityList.stream()
                .map(MyCommunityDetail::from)
                .toList();

        return GetMyCommunityResponse.builder()
                .communityList(myCommunityList)
                .build();
    }

    public void increaseHits(Integer communityId) {
        communityRepository.increaseHitsById(communityId);
    }
}
