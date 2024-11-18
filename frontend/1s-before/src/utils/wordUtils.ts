export function truncateHtmlByTotalLength(html: string, maxLength: number): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const paragraphs = Array.from(doc.body.querySelectorAll('p'));
  let totalLength = 0;
  let truncatedHtml = '';

  for (const p of paragraphs) {
    const textContent = p.textContent ?? '';
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
