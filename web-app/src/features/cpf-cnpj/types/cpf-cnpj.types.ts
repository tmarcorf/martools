export type DocType = 'cpf' | 'cnpj';

export interface GenerationOptions {
  type: DocType;
  formatted: boolean;
}

export interface GeneratedDocument {
  id: string;
  raw: string;
  formatted: string;
  type: DocType;
  generatedAt: Date;
}
