package com.ssafy.fiftyninesec.participation.client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateEventStatusRequest {
    private EventStatus status;
}
