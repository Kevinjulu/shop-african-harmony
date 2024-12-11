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
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        console.log('Detected country:', countryCode);
        
        if (CURRENCY_MAP[countryCode]) {
          setCurrency(CURRENCY_MAP[countryCode]);
          console.log('Setting currency to:', CURRENCY_MAP[countryCode]);
        }
      } catch (error) {
        console.error('Error detecting location:', error);
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