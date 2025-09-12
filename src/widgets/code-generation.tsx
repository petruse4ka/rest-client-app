import { Flex, Select } from 'antd';
import sdk from 'postman-code-generators';
import { Typography } from 'antd';

const { Text } = Typography;

export function CodeGeneration() {
  const codeLanguages = sdk.getLanguageList().map((lang) => ({
    value: lang.key,
    label: lang.label,
  }));

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Flex vertical>
      <Select
        defaultValue={codeLanguages[0].value}
        style={{ width: 120 }}
        onChange={handleChange}
        options={codeLanguages}
      />
      <Text copyable></Text>
    </Flex>
  );
}
