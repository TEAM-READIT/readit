package readit.viewer.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ViewerServiceTest {

    @Autowired
    private ViewerService viewerService;

    @Test
    @DisplayName("스레드 풀 테스트")
    void loadArticleWithWords() throws InterruptedException {
        for (int i = 5; i < 36; i++) {
//            viewerService.loadArticleWithWords(i);
        }
//        Thread.sleep(100000);
    }
}