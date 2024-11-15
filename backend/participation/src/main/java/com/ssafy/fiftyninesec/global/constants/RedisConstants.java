package com.ssafy.fiftyninesec.global.constants;

public class RedisConstants {
    public static final String RANKING_KEY_PREFIX = "event:ranking:";
    public static final String PARTICIPATION_LOCK_PREFIX = "event:lock:";
    public static final String PARTICIPATION_QUEUE_PREFIX = "event:queue:";
    public static final String LAST_PROCESSED_ID_PREFIX = "event:last_processed:";

    // Lock 관련 상수
    public static final long LOCK_WAIT_TIME = 1000L;
    public static final long LOCK_LEASE_TIME = 500L;
}