import { Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import type { ChangeEvent } from 'react';

const { Item } = Form;

interface HeadersCellProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  dataIndex: string;
}

export default function HeadersCell(props: HeadersCellProps) {
  const { value, onChange, placeholder, dataIndex } = props;
  const t = useTranslations('RestClient');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Item
      name={dataIndex}
      style={{ margin: 0 }}
      initialValue={value}
      rules={[{ required: true, message: t('required') }]}
    >
      <Input placeholder={placeholder} allowClear size="small" onChange={handleChange} />
    </Item>
  );
}
