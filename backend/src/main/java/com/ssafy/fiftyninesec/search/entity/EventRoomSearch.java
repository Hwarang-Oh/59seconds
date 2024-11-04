package com.ssafy.fiftyninesec.search.entity;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Data
@Document(indexName = "eventrooms")
public class EventRoomSearch {

    @Id
    private Integer roomId;

    private Integer memberId;

    @Field(type = FieldType.Text, analyzer = "korean_analyzer")
    private String title;

    @Field(type = FieldType.Text, analyzer = "korean_analyzer")
    private String description;

    @Field(type = FieldType.Keyword)
    private String status; // "UPCOMING" 또는 "COMPLETED"

    @Field(type = FieldType.Date, format = {}, pattern = "yyyy-MM-dd['T'HH:mm:ss]")
    private LocalDateTime createdAt;

    @Field(type = FieldType.Date, format = {}, pattern = "yyyy-MM-dd['T'HH:mm:ss]")
    private LocalDateTime eventTime;

    private Integer winnerNum;

    private String enterCode;

    private Integer unlockCount;

    private String bannerImage;

    private String squareImage;

    private String rectangleImage;
}
