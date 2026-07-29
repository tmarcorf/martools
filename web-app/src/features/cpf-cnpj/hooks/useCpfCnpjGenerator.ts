import { useCallback, useEffect, useRef, useState } from 'react';
import type { GeneratedDocument, GenerationOptions } from '../types/cpf-cnpj.types';

function randomDigit(): number {
  return Math.floor(Math.random() * 10);
}

function generateDigits(count: number): number[] {
  return Array.from({ length: count }, () => randomDigit());
}

/**
 * CPF: 9 random digits + 2 check digits
 * DV1: sum of (digit * weight) for weights 10..2, then (sum * 10) % 11 (if >= 10 → 0)
 * DV2: same with 10 digits (9 orig + DV1) and weights 11..2
 */
function generateCpf(): string {
  const base = generateDigits(9);

  const calcDV = (digits: number[], startWeight: number): number => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * (startWeight - i);
    }
    const dv = (sum * 10) % 11;
    return dv >= 10 ? 0 : dv;
  };

  const dv1 = calcDV(base, 10);
  const dv2 = calcDV([...base, dv1], 11);

  return [...base, dv1, dv2].join('');
}

/**
 * CNPJ: 8 random base digits + 0001 (branch) + 2 check digits
 * DV1: sum of (digit * weight) for weights 5,4,3,2,9,8,7,6,5,4,3,2, then 11 - (sum % 11) (if >= 10 → 0)
 * DV2: same with 13 digits and weights 6,5,4,3,2,9,8,7,6,5,4,3,2
 */
function generateCnpj(): string {
  const base = generateDigits(8);
  const branch = [0, 0, 0, 1];
  const beforeDV = [...base, ...branch];

  const calcDV = (digits: number[], weights: number[]): number => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * weights[i];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const dv1 = calcDV(beforeDV, w1);

  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const dv2 = calcDV([...beforeDV, dv1], w2);

  return [...beforeDV, dv1, dv2].join('');
}

export function formatCpf(raw: string): string {
  return raw.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export function formatCnpj(raw: string): string {
  return raw.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function useCpfCnpjGenerator() {
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocument[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const generate = useCallback((options: GenerationOptions) => {
    setIsGenerating(true);

    timeoutRef.current = setTimeout(() => {
      const raw = options.type === 'cpf' ? generateCpf() : generateCnpj();
      const formatted = options.type === 'cpf' ? formatCpf(raw) : formatCnpj(raw);

      const doc: GeneratedDocument = {
        id: `${options.type}-${Date.now()}`,
        raw,
        formatted,
        type: options.type,
        generatedAt: new Date(),
      };

      setGeneratedDocs([doc]);
      setIsGenerating(false);
    }, 120);
  }, []);

  return { generate, generatedDocs, isGenerating };
}
