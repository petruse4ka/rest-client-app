'use client';

import { Flex, Select } from 'antd';
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';
import { Typography } from 'antd';
import { LanguageItem } from '@/types/interfaces';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface CodeGenerationProps {
  url: string;
  method: string;
}

export function CodeGeneration({ url, method }: CodeGenerationProps) {
  const [code, setCode] = useState('');
  const codeLanguages = codegen.getLanguageList().map((lang: LanguageItem) => ({
    value: JSON.stringify({ key: lang.key, variant: lang.variants[0].key }),
    label: lang.label,
  }));

  const handleChange = (value: string) => {
    const { key: language, variant } = JSON.parse(value);
    const request = new sdk.Request({
        url,
        method,
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
    handleChange(codeLanguages[0].value);
  }, []);

  return (
    <Flex vertical>
      <Select
        defaultValue={codeLanguages[0].value}
        style={{ width: 120 }}
        onChange={handleChange}
        options={codeLanguages}
      />
      <Text copyable>
        <pre style={{ margin: 0 }}>{code}</pre>
      </Text>
    </Flex>
  );
}
