import { type FC, useCallback, useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import type { Person, Position } from '../types';
import PeopleManager from './PeopleManager';
import PositionsList from './PositionsList';
import SummarySection from './SummarySection';
import { SettingsDropdown } from './SettingsDropdown';

export const BillSplitterApp: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [editingPosition, setEditingPosition] = useState<number | null>(null);

  const addPerson = useCallback((name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setPeople(currentPeople => {
      if (currentPeople.some(p => p.name === trimmedName)) return currentPeople;
      return [...currentPeople, { id: Date.now(), name: trimmedName }];
    });
  }, []);

  const removePerson = useCallback((personId: number) => {
    setPeople(currentPeople => currentPeople.filter(p => p.id !== personId));

    setPositions(currentPositions =>
      currentPositions.map(position => ({
        ...position,
        assignedPeople: position.assignedPeople.filter(id => id !== personId)
      }))
    );
  }, []);

  const addPosition = useCallback(() => {
    const newPosition: Position = {
      id: Date.now(),
      name: '',
      price: 0,
      assignedPeople: []
    };

    setPositions(currentPositions => [...currentPositions, newPosition]);
    setEditingPosition(newPosition.id);
  }, []);

  const updatePosition = useCallback((id: number, field: string, value: any) => {
    setPositions(currentPositions =>
      currentPositions.map(position =>
        position.id === id ? { ...position, [field]: value } : position
      )
    );
  }, []);

  const savePosition = useCallback(() => {
    setEditingPosition(null);
  }, []);

  const deletePosition = useCallback((id: number) => {
    setPositions(currentPositions =>
      currentPositions.filter(position => position.id !== id)
    );
  }, []);

  const togglePersonAssignment = useCallback((positionId: number, personId: number) => {
    setPositions(currentPositions =>
      currentPositions.map(position => {
        if (position.id !== positionId) return position;

        const isAssigned = position.assignedPeople.includes(personId);
        return {
          ...position,
          assignedPeople: isAssigned
            ? position.assignedPeople.filter(id => id !== personId)
            : [...position.assignedPeople, personId]
        };
      })
    );
  }, []);

  const calculateTotalPerPerson = useCallback(() => {
    const totals: Record<number, number> = {};

    // Initialize totals with zero for all people
    people.forEach(person => {
      totals[person.id] = 0;
    });

    // Calculate each person's share
    positions.forEach(position => {
      const { assignedPeople, price } = position;
      if (assignedPeople.length > 0) {
        const pricePerPerson = price / assignedPeople.length;
        assignedPeople.forEach(personId => {
          totals[personId] = (totals[personId] || 0) + pricePerPerson;
        });
      }
    });

    return totals;
  }, [people, positions]);

  const totals = useMemo(() => calculateTotalPerPerson(), [calculateTotalPerPerson]);
  const grandTotal = useMemo(() =>
    positions.reduce((sum, position) => sum + position.price, 0),
    [positions]
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br text-black from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 dark:text-white p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-3 sm:p-5 md:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center">
              <Calculator className="mr-2 sm:mr-3 text-blue-600 dark:text-blue-400 h-6 w-6 sm:h-8 sm:w-8" />
              <span>Bill Splitter</span>
            </h1>
            <SettingsDropdown />
          </div>

          <PeopleManager
            people={people}
            onAddPerson={addPerson}
            onRemovePerson={removePerson}
          />

          <PositionsList
            positions={positions}
            people={people}
            editingPosition={editingPosition}
            onAddPosition={addPosition}
            onUpdatePosition={updatePosition}
            onSavePosition={savePosition}
            onDeletePosition={deletePosition}
            onSetEditingPosition={setEditingPosition}
            onTogglePersonAssignment={togglePersonAssignment}
          />

          <SummarySection
            people={people}
            positions={positions}
            totals={totals}
            grandTotal={grandTotal}
          />
        </div>
      </div>
    </div>
  );
};
