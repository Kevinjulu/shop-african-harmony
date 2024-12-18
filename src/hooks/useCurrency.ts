import { useState, useEffect } from 'react';

interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  'KE': { code: 'KES', symbol: 'KSh', rate: 130.5 }, // Kenya Shilling
  'NG': { code: 'NGN', symbol: '₦', rate: 460.0 },   // Nigerian Naira
  'US': { code: 'USD', symbol: '$', rate: 1 },       // Default
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState<CurrencyInfo>(CURRENCY_MAP['US']);

  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        // Using a more reliable free API
        const response = await fetch('https://api.db-ip.com/v2/free/self');
        console.log('Attempting to detect location...');
        
        if (!response.ok) {
          throw new Error('Location detection failed');
        }
        
        const data = await response.json();
        const countryCode = data.countryCode;
        
        console.log('Detected country:', countryCode);
        
        if (CURRENCY_MAP[countryCode]) {
          setCurrency(CURRENCY_MAP[countryCode]);
          console.log('Setting currency to:', CURRENCY_MAP[countryCode]);
        } else {
          console.log('Country not supported, using default USD');
        }
      } catch (error) {
        console.log('Location detection failed, using default USD currency');
        // Keep using the default US currency that was set in useState
      }
    };

    detectUserLocation();
  }, []);

  const formatPrice = (price: number) => {
    const convertedPrice = price * currency.rate;
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  return { currency, formatPrice };
};
