import { useState } from 'react';
import { X } from 'lucide-react';

interface CurrencyModalProps {
  onClose: () => void;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

export const CurrencyModal = ({ onClose }: CurrencyModalProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const saved = localStorage.getItem('currency');
    return saved ? JSON.parse(saved) : CURRENCIES[0];
  });

  const handleCurrencyChange = (currency: typeof CURRENCIES[0]) => {
    setSelectedCurrency(currency);
    localStorage.setItem('currency', JSON.stringify(currency));
  };

  const handleSave = () => {
    localStorage.setItem('currency', JSON.stringify(selectedCurrency));
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Currency Settings</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4 mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select your preferred currency for bill calculations
        </p>
        
        <div className="grid gap-2">
          {CURRENCIES.map((currency) => (
            <div 
              key={currency.code}
              onClick={() => handleCurrencyChange(currency)}
              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                selectedCurrency.code === currency.code 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-xl mr-3">
                {currency.symbol}
              </div>
              <div>
                <div className="font-medium">{currency.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{currency.code}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
};
