'use client';

import { Flex, Select } from 'antd';
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';
import { Typography } from 'antd';
import { LanguageItem } from '@/types/interfaces';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface CodeGenerationProps {
  request: {
    url: string;
    method: string;
    headers: { id: number; key: string; value: string }[];
    data: string;
  };
}

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
        url,
        method,
        header: headers?.map(({ key, value }) => ({ key, value })) || [],
        body: data ? { mode: 'raw', raw: data } : undefined,
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
          console.log(error);
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
        style={{ width: 120 }}
        onChange={handleChange}
        options={codeLanguages}
      />
      <Text copyable style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <pre style={{ margin: 0 }}>{code}</pre>
      </Text>
    </Flex>
  );
}
