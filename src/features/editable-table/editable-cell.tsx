import { VariablesData } from '@/types/types';
import { Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

const { Item } = Form;

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  data: VariablesData[];
  record: VariablesData;
  editing: boolean;
  dataIndex: string;
}

export default function EditableCell(props: EditableCellProps) {
  const { data, record, editing, dataIndex, children } = props;
  const t = useTranslations('Variables');

  return (
    <td>
      {editing ? (
        <Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: t('inputErrors.empty'),
            },
            {
              validator: (_, value) => {
                if (dataIndex === 'variable') {
                  const isDuplicate = data.some(
                    (item) => item.variable === value && item.key !== record.key
                  );
                  return isDuplicate ? Promise.reject(t('inputErrors.unique')) : Promise.resolve();
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input allowClear placeholder={t('placeholder')} />
        </Item>
      ) : (
        children
      )}
    </td>
  );
}
