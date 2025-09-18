'use client';

import { Flex, Select } from 'antd';
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';
import { Typography } from 'antd';
import { LanguageItem } from '@/types/interfaces';
import { CSSProperties, useEffect, useState } from 'react';
import { substituteVariables } from '@/shared/utils';

const { Text } = Typography;

interface CodeGenerationProps {
  request: {
    url: string;
    method: string;
    headers: { id: number; key: string; value: string }[];
    data: string;
  };
}

const TextContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 5,
};

const CodeStyle: CSSProperties = { margin: 0, width: '100%', maxHeight: '50svh', overflow: 'auto' };

export function CodeGeneration({ request }: CodeGenerationProps) {
  const { url, method, headers, data } = request;
  const [code, setCode] = useState('');
  const codeLanguages = codegen.getLanguageList().map((lang: LanguageItem) => ({
    value: JSON.stringify({ key: lang.key, variant: lang.variants[0].key }),
    label: lang.label,
  }));
  const [selectedLang, setSelectedLang] = useState(codeLanguages[0].value);

  const handleChange = (value: string) => {
    setSelectedLang(value);

    const { key: language, variant } = JSON.parse(value);
    const request = new sdk.Request({
        url: substituteVariables(url),
        method,
        header:
          headers?.map(({ key, value }) => ({
            key: substituteVariables(key),
            value: substituteVariables(value),
          })) || [],
        body: data ? { mode: 'raw', raw: substituteVariables(data.trim()) } : undefined,
      }),
      options = {
        indentCount: 3,
        indentType: 'Space',
        trimRequestBody: true,
        followRedirect: true,
      };

    codegen.convert(
      language,
      variant,
      request,
      options,
      function (error: unknown, snippet: string) {
        if (error) {
          setCode('Error generating code snippet');
        }
        setCode(snippet);
      }
    );
  };

  useEffect(() => {
    handleChange(selectedLang);
  }, [request]);

  return (
    <Flex vertical gap={10}>
      <Select
        defaultValue={selectedLang}
        style={{ width: 130 }}
        onChange={handleChange}
        options={codeLanguages}
      />
      <Text copyable style={TextContainerStyle}>
        <pre style={CodeStyle}>{code}</pre>
      </Text>
    </Flex>
  );
}
