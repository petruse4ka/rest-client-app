import { VariablesData } from '@/types/types';
import EditableCell from '../editable-table/editable-cell';
import { screen } from '@testing-library/react';
import { render } from '@/__tests__/test-utils/test-utils';

const data: VariablesData[] = [
  { key: 1, variable: 'A', value: '1' },
  { key: 2, variable: 'B', value: '2' },
];

describe('EditableCell', () => {
  test('Rendering editable', () => {
    render(<EditableCell data={data} record={data[0]} editing={true} dataIndex="variable" />);
    expect(screen.getByTestId('editable-cell')).toBeInTheDocument();
  });

  test('Rendering static', () => {
    render(
      <EditableCell data={data} record={data[0]} editing={false} dataIndex="variable">
        Static
      </EditableCell>
    );

    expect(screen.getByText('Static')).toBeInTheDocument();
  });
});
