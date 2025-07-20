import {type FC} from 'react';
import {X} from 'lucide-react';

interface PersonItemProps {
  id: number;
  name: string;
  onRemove: (id: number) => void;
}

const PersonItem: FC<PersonItemProps> = ({id, name, onRemove}) => {
  return (
    <div
      className="bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full flex items-center">
      <span className="mr-2">{name}</span>
      <button
        onClick={() => onRemove(id)}
        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 cursor-pointer"
      >
        <X size={16}/>
      </button>
    </div>
  );
};

export default PersonItem;
