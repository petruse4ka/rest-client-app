export function measureDuration<T>(
  fn: () => Promise<T>
): Promise<{ response: T; durationMs: number }> {
  const start = performance.now();
  return fn().then((response) => {
    const end = performance.now();
    return { response, durationMs: Math.round(end - start) };
  });
}

export function getSize(obj: unknown): number {
  return new TextEncoder().encode(JSON.stringify(obj ?? {})).length;
}
