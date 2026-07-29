import type { DocType } from '../types/cpf-cnpj.types';

interface GeneratorCardProps {
  docType: DocType;
  formatted: boolean;
  onDocTypeChange: (type: DocType) => void;
  onFormattedChange: (formatted: boolean) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function GeneratorCard({
  docType,
  formatted,
  onDocTypeChange,
  onFormattedChange,
  onGenerate,
  isGenerating,
}: GeneratorCardProps) {
  return (
    <div className="card generator-card animate-fade-in">
      {/* Prompt line */}
      <div className="hero__prompt">
        <div className="hero__prompt-line">
          <span className="hero__prompt-char">$</span>
          <span className="hero__prompt-text">
            gerar {docType === 'cpf' ? '--cpf' : '--cnpj'}
            {formatted ? ' --formatado' : ' --bruto'}
          </span>
          <span className="hero__cursor" />
        </div>
      </div>

      {/* Tabs */}
      <div className="generator-card__tabs">
        <button
          type="button"
          className={`generator-card__tab ${docType === 'cpf' ? 'generator-card__tab--active' : ''}`}
          onClick={() => onDocTypeChange('cpf')}
        >
          CPF
        </button>
        <button
          type="button"
          className={`generator-card__tab ${docType === 'cnpj' ? 'generator-card__tab--active' : ''}`}
          onClick={() => onDocTypeChange('cnpj')}
        >
          CNPJ
        </button>
      </div>

      {/* Controls */}
      <div className="generator-card__controls">
        {/* Formatted toggle */}
        <div className="generator-card__field">
          <span className="generator-card__label">Máscara</span>
          <div
            className={`generator-card__toggle ${formatted ? 'generator-card__toggle--active' : ''}`}
            onClick={() => onFormattedChange(!formatted)}
            role="switch"
            aria-checked={formatted}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onFormattedChange(!formatted);
              }
            }}
          >
            <div className="generator-card__toggle-track">
              <div className="generator-card__toggle-thumb" />
            </div>
            <span className="generator-card__toggle-label">
              {formatted ? 'formatado' : 'apenas dígitos'}
            </span>
          </div>
        </div>

        {/* Generate button */}
        <div className="generator-card__actions">
          <button
            type="button"
            className="generator-card__btn"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'gerando...' : 'Gerar'}
          </button>
        </div>
      </div>
    </div>
  );
}
