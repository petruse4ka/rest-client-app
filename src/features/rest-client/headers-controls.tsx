import { DeleteOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import Link from 'antd/es/typography/Link';

interface HeadersControlsProps {
  deleteItem: () => void;
}

export default function HeadersControls({ deleteItem }: HeadersControlsProps) {
  return (
    <Flex justify="center" align="center">
      <Link onClick={() => deleteItem()}>
        <DeleteOutlined />
      </Link>
    </Flex>
  );
}
