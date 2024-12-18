interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

export const CURRENCIES: { [key: string]: CurrencyInfo } = {
  'KE': { code: 'KES', symbol: 'KSh', rate: 130.5 },
  'NG': { code: 'NGN', symbol: '₦', rate: 460.0 },
  'GH': { code: 'GHS', symbol: 'GH₵', rate: 12.5 },
  'TZ': { code: 'TZS', symbol: 'TSh', rate: 2500.0 },
  'US': { code: 'USD', symbol: '$', rate: 1 },
};

export const formatPrice = (price: number, countryCode: string = 'US') => {
  const currency = CURRENCIES[countryCode] || CURRENCIES['US'];
  const convertedPrice = price * currency.rate;
  return `${currency.symbol}${convertedPrice.toFixed(2)}`;
};

export const getCountryName = (code: string): string => {
  const countries: { [key: string]: string } = {
    'KE': 'Kenya',
    'NG': 'Nigeria',
    'GH': 'Ghana',
    'TZ': 'Tanzania',
    'US': 'United States',
  };
  return countries[code] || code;
};