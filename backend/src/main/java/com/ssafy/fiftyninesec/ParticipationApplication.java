package com.ssafy.fiftyninesec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FiftyninesecApplication {

	public static void main(String[] args) {
		SpringApplication.run(FiftyninesecApplication.class, args);
	}

}
