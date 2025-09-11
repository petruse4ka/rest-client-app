import { VariablesData } from '@/types/types';
import { Form, Input } from 'antd';
import { HTMLAttributes } from 'react';

const { Item } = Form;

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  data: VariablesData[];
  record: VariablesData;
  editing: boolean;
  dataIndex: string;
  title: string;
}

export default function EditableCell(props: EditableCellProps) {
  const { data, record, editing, dataIndex, title, children } = props;

  return (
    <td>
      {editing ? (
        <Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
            {
              validator: (_, value) => {
                const isDuplicate = data.some(
                  (item) => item.variable === value && item.key !== record.key
                );
                return isDuplicate ? Promise.reject('Variable must be unique') : Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Item>
      ) : (
        children
      )}
    </td>
  );
}
