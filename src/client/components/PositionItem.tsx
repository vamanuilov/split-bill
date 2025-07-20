import { type FC, useEffect, useRef, useState } from 'react';
import { Edit2, Save, Tag, X } from 'lucide-react';
import type { Person, Position } from '../types';

interface PositionItemProps {
  position: Position;
  people: Person[];
  isEditing: boolean;
  onUpdatePosition: (id: number, field: string, value: any) => void;
  onSavePosition: () => void;
  onDeletePosition: (id: number) => void;
  onSetEditingPosition: (id: number | null) => void;
  onTogglePersonAssignment: (positionId: number, personId: number) => void;
}

const parsePriceValue = (value: string): number => {
  if (value === '') return 0;
  const normalizedValue = value.replace(',', '.');
  const price = parseFloat(normalizedValue);
  return isNaN(price) ? 0 : price;
};

const PositionItem: FC<PositionItemProps> = ({
  position,
  people,
  isEditing,
  onUpdatePosition,
  onSavePosition,
  onDeletePosition,
  onSetEditingPosition,
  onTogglePersonAssignment
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [priceValue, setPriceValue] = useState<string>(String(position.price));

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!/^\d*[,.]?\d*$/.test(value)) {
      return;
    }

    setPriceValue(value);
    onUpdatePosition(position.id, 'price', parsePriceValue(value));
  };

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg py-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex-1">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={position.name}
                  onChange={(e) => onUpdatePosition(position.id, 'name', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSavePosition()}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Item name"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center relative w-32">
                  <Tag size={16} className="absolute left-3 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    value={priceValue}
                    onChange={handlePriceChange}
                    onKeyDown={(e) => e.key === 'Enter' && onSavePosition()}
                    className="w-full px-3 pl-8 py-2 border border-gray-300 dark:border-gray-600 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Price"
                    aria-label="Price"
                  />
                </div>
                <button
                  onClick={onSavePosition}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center whitespace-nowrap cursor-pointer sm:w-24"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-lg font-semibold break-words dark:text-white">{position.name}</span>
                <div className="flex items-center text-xl font-bold text-green-600 dark:text-green-400">
                  <Tag size={16} className="mr-0.5" />
                  {position.price.toFixed(2)}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onSetEditingPosition(position.id)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full cursor-pointer"
                  aria-label="Edit item"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDeletePosition(position.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1.5 bg-red-50 dark:bg-red-900/30 rounded-full cursor-pointer"
                  aria-label="Delete item"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex flex-wrap gap-2 mt-2">
          {people.map(person => (
            <button
              key={person.id}
              onClick={() => onTogglePersonAssignment(position.id, person.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${position.assignedPeople.includes(person.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
            >
              {person.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PositionItem;
