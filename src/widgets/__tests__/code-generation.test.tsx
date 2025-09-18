import { render } from '@/__tests__/test-utils/test-utils';
import { screen } from '@testing-library/react';
import { CodeGeneration } from '../code-generation';

describe('Code Generation', () => {
  const mockRequest = {
    url: 'https://api.example.com',
    method: 'GET',
    headers: [
      { id: 1, key: 'Authorization', value: 'Bearer token' },
      { id: 2, key: 'Content-Type', value: 'application/json' },
    ],
    data: '',
  };

  test('Render default', async () => {
    render(<CodeGeneration request={mockRequest} />);

    const languageSelect = screen.getByTestId('language-select');
    expect(languageSelect).toBeInTheDocument();

    const preTag = await screen.findByTestId('code-block');
    expect(preTag).toBeInTheDocument();
    expect(preTag.textContent.trim()).not.toBe('');
  });

  test('Render Default C#', async () => {
    render(<CodeGeneration request={mockRequest} />);

    const selectItem = screen.getByText('C#');
    expect(selectItem).toBeInTheDocument();

    const expectedCode = `
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, "https://api.example.com");
        request.Headers.Add("Authorization", "Bearer token");
        var content = new StringContent(string.Empty);
        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        request.Content = content;
        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        Console.WriteLine(await response.Content.ReadAsStringAsync());
        `.trim();

    const preTag = await screen.findByTestId('code-block');
    const preCode = preTag.textContent?.trim().replace(/\s+/g, ' ');
    expect(preCode).toBe(expectedCode.replace(/\s+/g, ' '));
  });
});
