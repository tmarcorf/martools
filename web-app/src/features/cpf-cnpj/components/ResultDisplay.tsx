import { useState, useCallback } from 'react';
import type { GeneratedDocument } from '../types/cpf-cnpj.types';

interface ResultDisplayProps {
  documents: GeneratedDocument[];
  formatted: boolean;
}

export function ResultDisplay({ documents, formatted }: ResultDisplayProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = useCallback(async (doc: GeneratedDocument) => {
    const text = formatted ? doc.formatted : doc.raw;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(doc.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(doc.id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  }, [formatted]);

  if (documents.length === 0) {
    return (
      <div className="result-display">
        <div className="result-display__empty">
          <span className="hero__prompt">
            <span className="hero__prompt-char">$</span> aguardando geração...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="result-display">
      <div className="result-display__items">
        {documents.map((doc) => (
          <div key={doc.id} className="result-display__item">
            <div>
              <span className="result-display__number">
                {formatted ? doc.formatted : doc.raw}
              </span>
              <span className="result-display__badge">
                {doc.type.toUpperCase()}
              </span>
            </div>
            <button
              type="button"
              className={`result-display__copy-btn ${copiedId === doc.id ? 'result-display__copy-btn--copied' : ''}`}
              onClick={() => handleCopy(doc)}
            >
              {copiedId === doc.id ? 'copiado' : 'copiar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
