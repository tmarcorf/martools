import { useState, useCallback } from 'react';
import type { DocType } from '../types/cpf-cnpj.types';
import { useCpfCnpjGenerator } from '../hooks/useCpfCnpjGenerator';
import { GeneratorCard } from '../components/GeneratorCard';
import { ResultDisplay } from '../components/ResultDisplay';

export function CpfCnpjPage() {
  const [docType, setDocType] = useState<DocType>('cpf');
  const [formatted, setFormatted] = useState(true);
  const { generate, generatedDocs, isGenerating } = useCpfCnpjGenerator();

  const handleGenerate = useCallback(() => {
    generate({ type: docType, formatted });
  }, [docType, formatted, generate]);

  return (
    <section className="section generator-page">
      <div className="section__inner">
        <div className="section-divider">// cpf-cnpj</div>

        <GeneratorCard
          docType={docType}
          formatted={formatted}
          onDocTypeChange={setDocType}
          onFormattedChange={setFormatted}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
        <ResultDisplay documents={generatedDocs} formatted={formatted} />
      </div>
    </section>
  );
}
