import { format, isValid, parseISO } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { TableRow } from '@/components/constants/interfaces';

const TableBody: React.FC<{
  rows: TableRow[];
  edit: boolean | undefined;
  remove: boolean | undefined;
  editFunction: ((id: string) => void) | undefined;
  removeFunction: ((id: string) => void) | undefined;
}> = ({ rows, remove, edit, editFunction, removeFunction }) => {
  return (
    <tbody className=" divide-y divide-gray-200">
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex} className="">
          {Object.values(row).map((value, colIndex) => {
            // Verificar si el valor es una URL o base64
            const isURLorBase64 =
              typeof value === 'string' &&
              (value.startsWith('http') || value.startsWith('data:image'));

            // Verificar si el valor es un UUID
            const isUUID =
              typeof value === 'string' &&
              value.match(
                /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
              );
            if (isUUID) return null;

            return (
              <td
                key={colIndex}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {value === null ? (
                  'No hay datos'
                ) : isURLorBase64 ? (
                  <picture>
                    <img
                      src={value}
                      alt="imagen"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </picture>
                ) : typeof value === 'string' && isValid(parseISO(value)) ? (
                  format(parseISO(value), 'dd/MM/yyyy')
                ) : (
                  value.toString().slice(0, 30) +
                  (value.toString().length > 30 ? '...' : '')
                )}
              </td>
            );
          })}
          {edit && (
            <td className="">
              <FaEdit
                className="text-primary-background text-xl hover:text-yellow-600 cursor-pointer"
                onClick={() => editFunction && editFunction(row.id)}
              />
            </td>
          )}
          {remove && (
            <td className="">
              <MdDelete
                className="text-primary-background text-xl hover:text-red-500 cursor-pointer"
                onClick={() => removeFunction && removeFunction(row.id)}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
