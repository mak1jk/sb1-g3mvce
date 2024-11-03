import OpenAI from 'openai';
import { AIModelService, Message, StreamCallbacks } from '../../types';

export class OpenAIService implements AIModelService {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model = 'gpt-4') {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  async streamChat(messages: Message[], callbacks: StreamCallbacks) {
    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        callbacks.onToken(content);
      }
    }
  }

  async embedText(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  }
}