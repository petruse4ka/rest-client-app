import { localStorageController } from './local-storage-controller';
import { VariablesData } from '@/types/types';
import { LOCAL_STORAGE_KEY } from '../constants';

export function substituteVariables(text: string): string {
  const storedVariables = localStorageController.get(LOCAL_STORAGE_KEY) || [];

  const substitutedText = text.replace(/\{\{([^}]+)\}\}/g, (match, variableName) => {
    const variable = storedVariables.find(
      (storedVariable: VariablesData) => storedVariable.variable === variableName
    );
    return variable?.value || match;
  });

  return substitutedText;
}
