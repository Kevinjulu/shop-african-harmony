import { useEffect, useState } from 'react';

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
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  useEffect(() => {
    const detectLocation = async () => {
      console.log('Attempting to detect location...');
      try {
        // Simulated currency data - in a real app, this would come from an API
        const currencies: { [key: string]: Currency } = {
          KE: { code: 'KES', symbol: 'KSh', rate: 130.5 },
          NG: { code: 'NGN', symbol: '₦', rate: 850 },
          GH: { code: 'GHS', symbol: 'GH₵', rate: 12.5 },
          US: { code: 'USD', symbol: '$', rate: 1 },
        };

        // For demo purposes, setting to KES
        // In production, this would be based on actual geolocation
        const detectedCountry = 'KE';
        console.log('Detected country:', detectedCountry);
        
        const detectedCurrency = currencies[detectedCountry] || DEFAULT_CURRENCY;
        console.log('Setting currency to:', detectedCurrency);
        setCurrency(detectedCurrency);
      } catch (error) {
        console.error('Error detecting location:', error);
        setCurrency(DEFAULT_CURRENCY);
      }
    };

    detectLocation();
  }, []);

  const formatPrice = (price: number): string => {
    const convertedPrice = price * currency.rate;
    
    // Format number with commas and 2 decimal places
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
    
    return `${currency.symbol} ${formattedNumber}`;
  };

  return {
    currency,
    formatPrice,
  };
};