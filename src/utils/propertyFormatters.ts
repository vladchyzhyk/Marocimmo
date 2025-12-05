export function formatPrice(price: number, currency: string, period?: string): string {
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);
  if (period) {
    return `${formattedPrice} ${currency} / ${period}`;
  }
  return `${formattedPrice} ${currency}`;
}

export function formatDeposit(amount: number, period: 'month' | 'week'): string {
  return `Deposit: ${amount} ${period}${amount > 1 ? 's' : ''}`;
}

export function formatSyndicFees(
  amount: number,
  currency: string,
  period: 'per month' | 'per week',
): string {
  const formattedAmount = new Intl.NumberFormat('en-US').format(amount);
  return `Syndic fees: ${formattedAmount} ${currency} / ${period}`;
}

export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getDescriptionPreview(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) {
    return text;
  }
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  return truncated + '...';
}

export function hasMoreText(text: string, previewLength: number = 150): boolean {
  return text.length > previewLength;
}
