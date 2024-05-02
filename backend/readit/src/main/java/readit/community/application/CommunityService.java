package readit.community.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.community.domain.dto.GetCreateCommunityRequest;
import readit.community.domain.repository.CommunityRepository;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    public void createCommunity(GetCreateCommunityRequest request) {

    }

}
