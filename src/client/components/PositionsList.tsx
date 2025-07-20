import { type FC } from 'react';
import { Edit2, Plus } from 'lucide-react';
import PositionItem from './PositionItem';
import type { Person, Position } from '../types';

interface PositionsListProps {
  positions: Position[];
  people: Person[];
  editingPosition: number | null;
  onAddPosition: () => void;
  onUpdatePosition: (id: number, field: string, value: any) => void;
  onSavePosition: () => void;
  onDeletePosition: (id: number) => void;
  onSetEditingPosition: (id: number | null) => void;
  onTogglePersonAssignment: (positionId: number, personId: number) => void;
}

const PositionsList: FC<PositionsListProps> = ({
  positions,
  people,
  editingPosition,
  onAddPosition,
  onUpdatePosition,
  onSavePosition,
  onDeletePosition,
  onSetEditingPosition,
  onTogglePersonAssignment,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Edit2 className="mr-2 text-blue-600 dark:text-blue-400" />
          Items
        </h2>
      </div>

      {positions.length === 0 ? (
        <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
          <p className="mb-3 sm:mb-4">No items added yet</p>
          <button
            onClick={onAddPosition}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto justify-center cursor-pointer"
          >
            <Plus size={18} className="mr-2" />
            Add your first item
          </button>
        </div>
      ) : (
        <div>
          {positions.map(position => (
            <PositionItem
              key={position.id}
              position={position}
              people={people}
              isEditing={editingPosition === position.id}
              onUpdatePosition={onUpdatePosition}
              onSavePosition={onSavePosition}
              onDeletePosition={onDeletePosition}
              onSetEditingPosition={onSetEditingPosition}
              onTogglePersonAssignment={onTogglePersonAssignment}
            />
          ))}

          <div className="mt-4 sm:mt-6 flex justify-center">
            <button
              onClick={onAddPosition}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center w-full sm:w-auto cursor-pointer"
            >
              <Plus size={18} className="mr-2" />
              Add new item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionsList;
