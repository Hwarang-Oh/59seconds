/**
 * IMP : 이벤트 종료 시간까지 남은 시간을 초 단위로 변환함.
 * @param eventTime
 * @returns
 */
export function getRemainingTimeInSeconds(eventTime: string) {
  const endTime = new Date(eventTime).getTime();
  const currentTime = Date.now();
  return Math.max(0, (endTime - currentTime) / 1000); // 초 단위로 계산
}

/**
 * IMP : 2개의 시각 차이를 밀리초 단위로 변환합니다.
 * @param seconds
 * @returns
 */
export function calculateTimeDifferenceWithMilliseconds(eventTime: string, joinedAt: string) {
  const eventDate = new Date(eventTime);
  const joinedDate = new Date(joinedAt);
  const diffMs = Math.abs(eventDate.getTime() - joinedDate.getTime());
  return (diffMs / 1000).toFixed(3); // 밀리초 포함 소수점 3자리로 변환
}

/**
 * IMP : 남은 시간을 시, 분, 초 형식으로 포맷팅하여 반환합니다.
 */
export function formatTimeRemaining(seconds: number): string {
  const hours = String(Math.floor((seconds / 3600) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((seconds / 60) % 60)).padStart(2, '0');
  const secondsFormatted = String(Math.floor(seconds % 60)).padStart(2, '0');

  return `${hours}:${minutes}:${secondsFormatted}`;
}

/**
 * IMP : 남은 시간을 일, 시, 분, 초 단위로 변환한다.
 */
export function getTimes(remainingTime: number) {
  const days = Math.floor(remainingTime / (3600 * 24));
  const hours = Math.floor((remainingTime / 3600) % 24);
  const minutes = Math.floor((remainingTime / 60) % 60);
  const seconds = Math.floor(remainingTime % 60);
  return { days, hours, minutes, seconds };
}

/**
 * IMP: 날짜 문자열을 기본 형식 (YYYY.MM.DD HH:MM:SS)으로 포맷팅합니다.
 */
export function formatTimeBasic(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * IMP: 날짜 문자열을 기본 형식 2 (HH:MM:SS AM/PM)으로 포맷팅합니다.
 * @param dateString
 * @returns
 */
export function formatTimeBasic2(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // 12시간제로 변환 (0은 12로 표시)
  return `${hours}:${minutes}:${seconds} ${period}`;
}

/**
 * IMP : 날짜 문자열을 밀리초 포함 형식으로 (HH:mm:ss.SSSZ) 변환한다.
 * @param dateString
 * @returns
 */
export function formatTimeWithMilliseconds(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // 12시간제로 변환 (0은 12로 표시)
  return `${period} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
