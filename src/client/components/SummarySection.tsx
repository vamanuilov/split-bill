import { type FC, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Person, Position } from '../types';

interface SummarySectionProps {
  people: Person[];
  positions: Position[];
  totals: Record<number, number>;
  grandTotal: number;
}

const SummarySection: FC<SummarySectionProps> = ({ people, positions, totals, grandTotal }) => {
  const [expandedPersonId, setExpandedPersonId] = useState<number | null>(null);
  
  const togglePersonExpand = (personId: number) => {
    setExpandedPersonId(expandedPersonId === personId ? null : personId);
  };
  
  const getPersonPositions = (personId: number) => {
    return positions.filter(position => 
      position.assignedPeople.includes(personId)
    );
  };
  
  const getCurrency = () => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      try {
        return JSON.parse(savedCurrency).symbol;
      } catch (e) {
        return '$';
      }
    }
    return '$';
  };
  
  const currencySymbol = getCurrency();
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white rounded-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {people.map(person => {
          const personPositions = getPersonPositions(person.id);
          const isExpanded = expandedPersonId === person.id;
          
          return (
            <div key={person.id} className="bg-white/20 rounded-lg overflow-hidden">
              <div 
                className="p-3 sm:p-4 cursor-pointer hover:bg-white/30 transition-colors flex justify-between items-center"
                onClick={() => togglePersonExpand(person.id)}
              >
                <div>
                  <div className="font-semibold text-base sm:text-lg">{person.name}</div>
                  <div className="text-xl sm:text-2xl font-bold flex items-center">
                    <span className="mr-0.5">{currencySymbol}</span>
                    {(totals[person.id] || 0).toFixed(2)}
                  </div>
                </div>
                {personPositions.length > 0 && (
                  <div className="text-white/70">
                    {isExpanded ? <ChevronUp size={18} className="sm:w-5 sm:h-5" /> : <ChevronDown size={18} className="sm:w-5 sm:h-5" />}
                  </div>
                )}
              </div>
              
              {isExpanded && personPositions.length > 0 && (
                <div className="bg-white/10 border-t border-white/20 p-2 sm:p-3 space-y-1.5 sm:space-y-2 max-h-48 overflow-y-auto">
                  {personPositions.map(position => {
                    const pricePerPerson = position.price / position.assignedPeople.length;
                    
                    return (
                      <div key={position.id} className="flex justify-between items-center text-sm py-0.5">
                        <div className="break-words pr-2 max-w-[70%]">{position.name}</div>
                        <div className="font-medium whitespace-nowrap flex items-center">
                          <span className="mr-0.5">{currencySymbol}</span>
                          {pricePerPerson.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white border-opacity-30">
        <div className="text-center">
          <div className="text-base sm:text-lg">Total Bill</div>
          <div className="text-2xl sm:text-3xl font-bold flex items-center justify-center">
            <span className="mr-1">{currencySymbol}</span>
            {grandTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
