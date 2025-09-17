import { localStorageController } from './local-storage-controller';
import { VariablesData } from '@/types/types';

export function substituteVariables(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }

  const storedVariables = localStorageController.get('rest-variables') || [];

  const substitutedText = text.replace(/\{\{([^}]+)\}\}/g, (match, variableName) => {
    const variable = storedVariables.find(
      (storedVariable: VariablesData) => storedVariable.variable === variableName
    );
    return variable?.value || match;
  });

  return substitutedText;
}
