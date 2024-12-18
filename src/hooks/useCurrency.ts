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
        // Try primary API
        const response = await fetch('https://ipapi.co/json/', {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Primary API failed');
        }
        
        const data = await response.json();
        const countryCode = data.country_code;
        
        console.log('Detected country:', countryCode);
        
        if (CURRENCY_MAP[countryCode]) {
          setCurrency(CURRENCY_MAP[countryCode]);
          console.log('Setting currency to:', CURRENCY_MAP[countryCode]);
        }
      } catch (error) {
        // Fallback to secondary API
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          console.log('Falling back to secondary API');
          
          if (!response.ok) {
            throw new Error('Secondary API failed');
          }
          
          // If even fallback fails, we'll keep the default US currency
          console.log('Using default USD currency due to API failures');
        } catch (fallbackError) {
          console.log('Both APIs failed, using default USD currency');
        }
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
