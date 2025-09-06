export default function getRandomMessage(currentMessage: string, messages: string[]) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMessage = messages[randomIndex];
  if (randomMessage === currentMessage) {
    return getRandomMessage(currentMessage, messages);
  }
  return messages[randomIndex];
}
