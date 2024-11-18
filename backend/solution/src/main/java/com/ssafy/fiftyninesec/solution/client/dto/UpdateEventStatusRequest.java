package com.ssafy.fiftyninesec.solution.client.dto;

import com.ssafy.fiftyninesec.solution.entity.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateEventStatusRequest {
    private EventStatus status;
}
