package readit.viewer.domain.dto.request;

import readit.viewer.domain.entity.Memo;

import java.util.List;


public record TempSaveRequest(
        List<Memo> memoList,
        String summary
) {
}
