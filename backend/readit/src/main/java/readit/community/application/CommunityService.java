package readit.community.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.dto.Page;
import readit.community.domain.dto.CommunityDetail;
import readit.community.domain.dto.CommunityDetailMember;
import readit.community.domain.dto.request.GetCreateCommunityRequest;
import readit.community.domain.dto.request.PostChatRequest;
import readit.community.domain.dto.response.GetCommunityDetailResponse;
import readit.community.domain.dto.response.GetCommunityListResponse;
import readit.community.domain.dto.response.GetHotCommunityResponse;
import readit.community.domain.dto.response.GetMyCommunityResponse;
import readit.community.domain.entity.Chat;
import readit.community.domain.entity.Community;
import readit.community.domain.entity.Participants;
import readit.community.domain.repository.ChatRepository;
import readit.community.domain.repository.CommunityQueryRepository;
import readit.community.domain.repository.CommunityRepository;
import readit.community.domain.repository.ParticipantsRepository;
import readit.community.exception.CommunityFullException;
import readit.community.util.DateUtil;
import readit.member.domain.Member;
import readit.member.domain.repository.MemberRepository;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.repository.MemberArticleRepository;

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
    private final CommunityQueryRepository communityQueryRepository;

    public void createCommunity(GetCreateCommunityRequest request, Integer memberId) {
        Member member = memberRepository.getById(memberId);
        Community community = communityRepository.save(GetCreateCommunityRequest.toEntity(request, member));
        Participants participants = Participants.create(community, member);
        participantsRepository.save(participants);
    }

    public void joinCommunity(Integer communityId, Integer memberId) {
        Community community = communityRepository.getById(communityId);
        // 이미 가입한 커뮤니티일 때
        participantsRepository.ifExistsMemberJoinCommunity(memberId, communityId);

        // 최대 정원보다 적을 때
        if (community.getParticipants().size() < community.getMaxParticipants()) {
            Member member = memberRepository.getById(memberId);
            Participants participants = community.joinParticipant(member);
            participantsRepository.save(participants);
        } else {
            throw new CommunityFullException();
        }
    }

    public void leaveCommunity(Integer communityId, Integer memberId) {
        participantsRepository.safeLeaveCommunity(memberId, communityId);
        if (!participantsRepository.existsByCommunity_Id(communityId)) {
            communityRepository.deleteById(communityId);
        }
    }

    public void sendChat(PostChatRequest request, Integer memberId) {
        Community community = communityRepository.getById(request.communityId());
        Participants participant = participantsRepository.getByMemberIdAndCommunityId(memberId, request.communityId());
        chatRepository.save(Chat.create(community, participant, request.content()));
    }

    @Transactional(readOnly = true)
    public GetCommunityDetailResponse getCommunityDetail(Integer communityId, Integer memberId) {
        Community community = communityRepository.getById(communityId);
        List<CommunityDetailMember> memberList = createCommunityDetailMemberList(community, DateUtil.startOfWeek, DateUtil.endOfWeek);
        List<MemberArticle> memberArticles = memberArticleRepository.findByCommunityIdInThisWeek(communityId, DateUtil.startOfWeek, DateUtil.endOfWeek);
        System.out.println(memberArticles.toString());
        List<Chat> chatList = chatRepository.findAllByCommunityId(communityId);

        return GetCommunityDetailResponse.of(community,
                memberId,
                memberList,
                memberArticles,
                chatList);
    }

    private List<CommunityDetailMember> createCommunityDetailMemberList(
            Community community,
            LocalDateTime startOfWeek,
            LocalDateTime endOfWeek) {
        return community.getParticipants().stream()
                .map(participant -> CommunityDetailMember.of(
                                participant.getMember(),
                                memberArticleRepository.countMyArticleThisWeek(community.getId(),
                                        participant.getMember().getId(),
                                        startOfWeek,
                                        endOfWeek
                                )
                        )
                )
                .toList();
    }

    @Transactional(readOnly = true)
    public GetHotCommunityResponse getHotCommunityList() {
        List<Community> communityList = communityRepository.findTop8ByOrderByHitsDesc();
        List<CommunityDetail> communityDetailList = mapToCommunityDetails(communityList);
        return GetHotCommunityResponse.from(communityDetailList);
    }

    private List<CommunityDetail> mapToCommunityDetails(List<Community> communityList) {
        return communityList.stream()
                .map(CommunityDetail::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public GetMyCommunityResponse getMyCommunityList(Integer memberId) {
        List<Community> communityList = communityRepository.findAllByMemberId(memberId);
        return GetMyCommunityResponse.from(communityList);
    }

    public void increaseHits(Integer communityId) {
        communityRepository.increaseHitsById(communityId);
    }

    public void communityNotice(Integer communityId, String notice){
        Community community = communityRepository.getById(communityId);
        community.updateNotice(notice);
        communityRepository.save(community);
    }

    @Transactional(readOnly = true)
    public GetCommunityListResponse getCommunityList(String category, String title, String content, String writerName, Integer maxParticipants, Integer cursor, Boolean hit, Integer limit) {
        Community community = communityRepository.getByIdForQuery(cursor);
        Integer hitCursor = Optional.ofNullable(community)
                .map(Community::getHits)
                .orElse(null);
        Page<Community> communityList = communityQueryRepository.findCommunityWithFilter(hitCursor, category, title, content, writerName, maxParticipants, cursor, hit, limit);
        return GetCommunityListResponse.from(communityList);
    }
}
