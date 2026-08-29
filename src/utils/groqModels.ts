export interface GroqModelOption {
  id: string;
  name: string;
  category: string;
  contextWindow?: string;
  recommended?: boolean;
}

export const GROQ_MODELS: GroqModelOption[] = [
  // Meta Llama
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B Versatile',
    category: 'Meta',
    contextWindow: '128k',
    recommended: true,
  },
  {
    id: 'llama-3.1-70b-versatile',
    name: 'Llama 3.1 70B Versatile',
    category: 'Meta',
    contextWindow: '128k',
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B Instant (Ultra Fast)',
    category: 'Meta',
    contextWindow: '128k',
  },
  {
    id: 'llama-3.2-11b-vision-preview',
    name: 'Llama 3.2 11B Vision',
    category: 'Meta',
    contextWindow: '128k',
  },
  {
    id: 'meta-llama/llama-prompt-guard-2-86m',
    name: 'Llama Prompt Guard 2 86M',
    category: 'Meta',
  },
  {
    id: 'meta-llama/llama-prompt-guard-2-22m',
    name: 'Llama Prompt Guard 2 22M',
    category: 'Meta',
  },

  // OpenAI
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B',
    category: 'OpenAI',
    contextWindow: '128k',
  },
  {
    id: 'openai/gpt-oss-20b',
    name: 'GPT-OSS 20B',
    category: 'OpenAI',
    contextWindow: '128k',
  },
  {
    id: 'openai/gpt-oss-safeguard-20b',
    name: 'GPT-OSS Safeguard 20B',
    category: 'OpenAI',
  },

  // Alibaba Cloud (Qwen)
  {
    id: 'qwen/qwen3.6-27b',
    name: 'Qwen 3.6 27B',
    category: 'Alibaba Cloud',
    contextWindow: '32k',
  },
  {
    id: 'qwen/qwen3.8-27b',
    name: 'Qwen 3.8 27B',
    category: 'Alibaba Cloud',
    contextWindow: '32k',
  },

  // DeepSeek & Mistral & Google
  {
    id: 'deepseek-r1-distill-llama-70b',
    name: 'DeepSeek R1 Distill Llama 70B',
    category: 'DeepSeek',
    contextWindow: '128k',
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B 32k',
    category: 'Mistral',
    contextWindow: '32k',
  },
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B IT',
    category: 'Google',
    contextWindow: '8k',
  },

  // Groq & Canopy Labs
  {
    id: 'groq/compound',
    name: 'Groq Compound',
    category: 'Groq',
  },
  {
    id: 'groq/compound-mini',
    name: 'Groq Compound Mini',
    category: 'Groq',
  },
  {
    id: 'canopylabs/orpheus-v1-english',
    name: 'Orpheus V1 English',
    category: 'Canopy Labs',
  },
  {
    id: 'canopylabs/orpheus-arabic-saudi',
    name: 'Orpheus Arabic Saudi',
    category: 'Canopy Labs',
  },

  // Whisper Audio
  {
    id: 'whisper-large-v3',
    name: 'Whisper Large V3 (Audio)',
    category: 'OpenAI / Audio',
  },
  {
    id: 'whisper-large-v3-turbo',
    name: 'Whisper Large V3 Turbo',
    category: 'OpenAI / Audio',
  },
];

export function getStoredGroqModel(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('revlytics_groq_model') || 'llama-3.3-70b-versatile';
  }
  return 'llama-3.3-70b-versatile';
}

export function setStoredGroqModel(modelId: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('revlytics_groq_model', modelId);
  }
}
