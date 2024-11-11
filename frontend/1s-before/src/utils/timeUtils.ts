export function getRemainingTimeInSeconds(eventTime: string) {
  const endTime = new Date(eventTime).getTime();
  const currentTime = Date.now();
  return Math.max(0, (endTime - currentTime) / 1000); // 초 단위로 계산
}

export function getTimes(remainingTime: number) {
  const days = Math.floor(remainingTime / (3600 * 24));
  const hours = Math.floor((remainingTime / 3600) % 24);
  const minutes = Math.floor((remainingTime / 60) % 60);
  const seconds = Math.floor(remainingTime % 60);
  return { days, hours, minutes, seconds };
}

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

export function formatTimeWithMilliseconds(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
