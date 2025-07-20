import type { FC } from 'react';
import { Users } from 'lucide-react';
import PersonItem from './PersonItem';
import PersonInput from './PersonInput';
import { FriendSelector } from './FriendSelector';
import type { Person } from '../types';

interface PeopleManagerProps {
  people: Person[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: number) => void;
}

const PeopleManager: FC<PeopleManagerProps> = ({ people, onAddPerson, onRemovePerson }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Users className="mr-2 text-blue-600 dark:text-blue-400" />
          People
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {people.map(person => (
          <PersonItem
            key={person.id}
            id={person.id}
            name={person.name}
            onRemove={onRemovePerson}
          />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <PersonInput onAddPerson={onAddPerson} />
        </div>
        <div className="flex justify-center sm:justify-start">
          <FriendSelector onSelectFriend={onAddPerson} />
        </div>
      </div>
    </div>
  );
};

export default PeopleManager;
