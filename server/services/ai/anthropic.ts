import { Anthropic } from '@anthropic-ai/sdk';
import { AIModelService, Message, StreamCallbacks } from '../../types';

export class AnthropicService implements AIModelService {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model = 'claude-3-opus-20240229') {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  async streamChat(messages: Message[], callbacks: StreamCallbacks) {
    const stream = await this.client.messages.create({
      model: this.model,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.delta?.text;
      if (content) {
        callbacks.onToken(content);
      }
    }
  }
}