class Snowflake {
  private lastTimestamp: number = -1;
  private sequence: number = 0;

  // Custom epoch (기준 시간): 2020년 1월 1일을 기준으로 사용
  private readonly twepoch: number = 1577836800000;

  // Bitwise shifts
  private readonly workerIdBits: number = 5; // Worker ID는 최대 32개까지 허용 (0~31)
  private readonly datacenterIdBits: number = 5; // Datacenter ID는 최대 32개까지 허용
  private readonly sequenceBits: number = 12; // 시퀀스는 4096까지 허용 (0~4095)

  // Max values for each component
  private readonly maxWorkerId: number = -1 ^ (-1 << this.workerIdBits); // 31
  private readonly maxDatacenterId: number = -1 ^ (-1 << this.datacenterIdBits); // 31
  private readonly maxSequence: number = -1 ^ (-1 << this.sequenceBits); // 4095

  // Bit shifts for timestamp, datacenter, and worker
  private readonly workerIdShift: number = this.sequenceBits;
  private readonly datacenterIdShift: number = this.sequenceBits + this.workerIdBits;
  private readonly timestampLeftShift: number =
    this.sequenceBits + this.workerIdBits + this.datacenterIdBits;

  constructor(private readonly workerId: number, private readonly datacenterId: number) {
    // Worker ID와 Datacenter ID가 범위를 초과하면 오류 발생
    if (workerId > this.maxWorkerId || workerId < 0) {
      throw new Error(`Worker ID가 범위를 초과했습니다: ${workerId}`);
    }
    if (datacenterId > this.maxDatacenterId || datacenterId < 0) {
      throw new Error(`Datacenter ID가 범위를 초과했습니다: ${datacenterId}`);
    }
  }

  // Snowflake ID 생성 함수
  public generate(): string {
    let timestamp = this.currentTime();

    // 같은 밀리초에 여러 요청이 들어오면 시퀀스를 증가시킴
    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & this.maxSequence;
      if (this.sequence === 0) {
        // 시퀀스가 0이 되면 새로운 밀리초까지 기다림
        timestamp = this.waitUntilNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0; // 새로운 밀리초에 시퀀스를 리셋
    }

    this.lastTimestamp = timestamp;

    // Snowflake ID를 비트 연산으로 생성
    const snowflakeId =
      ((timestamp - this.twepoch) << this.timestampLeftShift) | // 타임스탬프 비트
      (this.datacenterId << this.datacenterIdShift) | // 데이터센터 비트
      (this.workerId << this.workerIdShift) | // 워커 ID 비트
      this.sequence; // 시퀀스 비트

    return snowflakeId.toString(); // 생성된 Snowflake ID를 문자열로 반환
  }

  // 현재 밀리초 반환
  private currentTime(): number {
    return Date.now();
  }

  // 다음 밀리초까지 대기
  private waitUntilNextMillis(lastTimestamp: number): number {
    let timestamp = this.currentTime();
    while (timestamp <= lastTimestamp) {
      timestamp = this.currentTime();
    }
    return timestamp;
  }
}

export default Snowflake;
