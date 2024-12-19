import { useEffect, useState } from 'react';
import { formatOriginalPrice, formatConvertedPrice, CURRENCIES } from '@/utils/currency';

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

  const formatPrice = (price: number, originCountry?: string): JSX.Element => {
    const originalPrice = formatOriginalPrice(price, originCountry);
    
    if (!originCountry || originCountry === userCurrency.code) {
      return <span>{originalPrice}</span>;
    }

    const convertedPrice = formatConvertedPrice(price, originCountry || 'US', userCurrency.code);
    
    return (
      <div className="space-y-0.5">
        <span className="text-base font-bold text-primary block">{originalPrice}</span>
        <span className="text-xs text-gray-500 block">≈ {convertedPrice}</span>
      </div>
    );
  };

  return {
    currency: userCurrency,
    formatPrice,
  };
};