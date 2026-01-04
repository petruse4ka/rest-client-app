import { getRandomMessage } from '../utils';

describe('getRandomMessage', () => {
  const testMessages = ['Message 1', 'Message 2', 'Message 3', 'Message 4', 'Message 5'];

  test('should return a different message than the current one if array has more than one message', () => {
    const currentMessage = 'Message 1';
    const result = getRandomMessage(currentMessage, testMessages);

    expect(result).not.toBe(currentMessage);
    expect(testMessages).toContain(result);
  });

  test('should return the only message if array has only one message', () => {
    const singleMessage = ['Only Message'];
    const currentMessage = 'Only Message';

    const result = getRandomMessage(currentMessage, singleMessage);
    expect(result).toBe('Only Message');
  });

  test('should work with empty array', () => {
    const emptyMessages: string[] = [];
    const currentMessage = 'Some Message';

    const result = getRandomMessage(currentMessage, emptyMessages);
    expect(result).toBe(currentMessage);
  });

  test('should handle array with duplicate messages', () => {
    const duplicateMessages = ['Message 1', 'Message 1', 'Message 2', 'Message 2'];
    const currentMessage = 'Message 1';

    const result = getRandomMessage(currentMessage, duplicateMessages);

    expect(duplicateMessages).toContain(result);
    expect(result).toBe('Message 2');
  });
});
