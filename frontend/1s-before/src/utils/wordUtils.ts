export function truncateHtmlByTotalLength(html: string, maxLength: number): string {
  const regex = /<p>(.*?)<\/p>/g; // 모든 <p> 태그 추출
  let match;
  let totalLength = 0;
  let truncatedHtml = '';

  while ((match = regex.exec(html)) !== null) {
    const textContent = match[1]; // <p> 내용 추출
    if (totalLength + textContent.length <= maxLength) {
      truncatedHtml += `<p>${textContent}</p>`;
      totalLength += textContent.length;
    } else {
      const remainingLength = maxLength - totalLength;
      truncatedHtml += `<p>${textContent.substring(0, remainingLength)}...</p>`;
      break;
    }
  }

  return truncatedHtml;
}

export function truncateDescription(description: string, maxLength: number): string {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description;
}
