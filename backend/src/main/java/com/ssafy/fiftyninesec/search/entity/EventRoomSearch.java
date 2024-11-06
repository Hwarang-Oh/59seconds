package com.ssafy.fiftyninesec.search.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.CompletionField;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.core.suggest.Completion;

import java.time.LocalDateTime;

@Data
@Document(indexName = "eventrooms")
public class EventRoomSearch {

    @Id
    private Long roomId;

    private Long memberId;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Keyword)
    private String status;

    @Field(type = FieldType.Date, format = {}, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @Field(type = FieldType.Date, format = {}, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startTime;

    @Field(type = FieldType.Date, format = {}, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endTime;

    private Integer winnerNum;

    private String enterCode;

    private Integer unlockCount;

    private String bannerImage;

    private String squareImage;

    private String rectangleImage;

    // 자동완성을 위한 Completion 필드
    @CompletionField(maxInputLength = 100)
    private Completion titleCompletion;

    // titleCompletion 필드를 업데이트하기 위한 메서드
    public void setTitleCompletion(String title) {
        this.titleCompletion = new Completion(new String[]{title});
    }
}
