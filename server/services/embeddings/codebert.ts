import { pipeline } from '@xenova/transformers';
import { EmbeddingService } from '../../types';

export class CodeBERTService implements EmbeddingService {
  private model: any;

  async init() {
    this.model = await pipeline('feature-extraction', 'Xenova/codebert-base');
  }

  async embedText(text: string): Promise<number[]> {
    if (!this.model) await this.init();
    const result = await this.model(text, { pooling: 'mean' });
    return Array.from(result.data);
  }
}