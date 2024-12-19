import { useEffect, useState } from 'react';
import { CURRENCIES, formatCurrencyValue } from '@/utils/currency';

interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

const DEFAULT_CURRENCY: Currency = {
  code: 'USD',
  symbol: '$',
  rate: 1
};

export const useCurrency = () => {
  const [userCurrency, setUserCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  useEffect(() => {
    const detectLocation = async () => {
      console.log('Attempting to detect location...');
      try {
        // Simulated currency data - in a real app, this would come from an API
        // For demo purposes, setting to KES
        const detectedCountry = 'KE';
        console.log('Detected country:', detectedCountry);
        
        const detectedCurrency = CURRENCIES[detectedCountry] || DEFAULT_CURRENCY;
        console.log('Setting currency to:', detectedCurrency);
        setUserCurrency(detectedCurrency);
      } catch (error) {
        console.error('Error detecting location:', error);
        setUserCurrency(DEFAULT_CURRENCY);
      }
    };

    detectLocation();
  }, []);

  const formatPrice = (price: number, originCountry?: string) => {
    const originalCurrency = CURRENCIES[originCountry || 'US'];
    
    // If no origin country or same as user currency, just format with user currency
    if (!originCountry || originCountry === userCurrency.code) {
      return (
        <span className="text-base font-bold text-primary">
          {formatCurrencyValue(price, userCurrency)}
        </span>
      );
    }

    // Convert price to user currency
    const usdPrice = price / originalCurrency.rate;
    const convertedPrice = usdPrice * userCurrency.rate;
    
    return (
      <div className="space-y-0.5">
        <span className="text-base font-bold text-primary block">
          {formatCurrencyValue(price, originalCurrency)}
        </span>
        <span className="text-xs text-gray-500 block">
          ≈ {formatCurrencyValue(convertedPrice, userCurrency)}
        </span>
      </div>
    );
  };

  return {
    currency: userCurrency,
    formatPrice,
  };
};