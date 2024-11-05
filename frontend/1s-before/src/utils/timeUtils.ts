export function getRemainingTimeInSeconds(eventTime: string) {
  const endTime = new Date(eventTime).getTime();
  const currentTime = Date.now();
  return Math.max(0, (endTime - currentTime) / 1000); // 초 단위로 계산
}

export function renderTime(remainingTime: number) {
  const days = Math.floor(remainingTime / (3600 * 24));
  const hours = Math.floor((remainingTime / 3600) % 24);
  const minutes = Math.floor((remainingTime / 60) % 60);
  const seconds = Math.floor(remainingTime % 60);
  return { days, hours, minutes, seconds };
}
