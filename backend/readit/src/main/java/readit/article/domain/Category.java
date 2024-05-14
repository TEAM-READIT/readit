package readit.article.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    public static Category from(CategoryType type) {
        return Category.builder()
                .id(type.getNumber())
                .name(type.getKrName())
                .build();
    }
}
