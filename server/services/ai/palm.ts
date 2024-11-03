import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIModelService, Message, StreamCallbacks } from '../../types';

export class PaLMService implements AIModelService {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model = 'gemini-pro') {
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  async streamChat(messages: Message[], callbacks: StreamCallbacks) {
    const model = this.client.getGenerativeModel({ model: this.model });
    const chat = model.startChat();
    
    const result = await chat.sendMessageStream(
      messages[messages.length - 1].content
    );

    for await (const chunk of result.stream) {
      const content = chunk.text();
      if (content) {
        callbacks.onToken(content);
      }
    }
  }
}