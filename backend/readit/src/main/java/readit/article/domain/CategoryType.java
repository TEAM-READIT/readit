package readit.article.domain;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.Getter;
import readit.article.exception.CategoryNotFoundException;

@Getter
public enum CategoryType {
    EPIGRAPHY("비문학"),
    POLITICS("정치"),
    ECONOMY("경제"),
    SOCIETY("사회"),
    CULTURE("생활/문화"),
    IT("IT/과학"),
    WORLD("세계"),
    OPINION("오피니언");

    private final String krName;

    CategoryType(String krName) {
        this.krName = krName;
    }

    private static final Map<String, CategoryType> NAME_TO_ENUM_MAP;

    static {
        NAME_TO_ENUM_MAP = Stream.of(values())
                .collect(Collectors.toMap(CategoryType::getKrName, category -> category));
    }

    public int getNumber() {
        return this.ordinal() + 1;  // 0부터 시작하여 각 열거형 상수의 순서 반환
    }

    public static Category getCategoryByKrName(String krName) {
        CategoryType categoryType = NAME_TO_ENUM_MAP.get(krName);
        if (categoryType == null) {
            throw new CategoryNotFoundException();
        }
        return Category.from(categoryType);
    }
}
