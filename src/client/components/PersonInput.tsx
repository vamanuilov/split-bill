import { type FC, useState } from 'react';
import { UserPlus } from 'lucide-react';

interface PersonInputProps {
  onAddPerson: (name: string) => void;
}

const PersonInput: FC<PersonInputProps> = ({ onAddPerson }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPerson(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter name"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center whitespace-nowrap cursor-pointer sm:w-24"
      >
        <UserPlus size={20} className="mr-2" />
        Add
      </button>
    </form>
  );
};

export default PersonInput;
