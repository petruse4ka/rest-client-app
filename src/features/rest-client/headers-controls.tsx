import { DeleteOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

interface HeadersControlsProps {
  deleteItem: () => void;
}

export default function HeadersControls({ deleteItem }: HeadersControlsProps) {
  return (
    <Link onClick={() => deleteItem()}>
      <DeleteOutlined />
    </Link>
  );
}
