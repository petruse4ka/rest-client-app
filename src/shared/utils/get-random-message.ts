export function getRandomMessage(currentMessage: string, messages: string[]) {
  if (messages.length === 0) {
    return currentMessage;
  }

  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMessage = messages[randomIndex];

  if (messages.length > 1 && randomMessage === currentMessage) {
    return getRandomMessage(currentMessage, messages);
  }

  return messages[randomIndex];
}
