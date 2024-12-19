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

export const formatOriginalPrice = (price: number, countryCode: string = 'US'): string => {
  const currency = CURRENCIES[countryCode] || CURRENCIES['US'];
  
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  
  return `${currency.symbol} ${formattedNumber}`;
};

export const formatConvertedPrice = (price: number, fromCountry: string, toCountry: string = 'US'): string => {
  const fromCurrency = CURRENCIES[fromCountry] || CURRENCIES['US'];
  const toCurrency = CURRENCIES[toCountry] || CURRENCIES['US'];
  
  const usdPrice = price / fromCurrency.rate;
  const convertedPrice = usdPrice * toCurrency.rate;
  
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedPrice);
  
  return `${toCurrency.symbol} ${formattedNumber}`;
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