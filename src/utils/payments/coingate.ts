import { supabase } from "@/integrations/supabase/client";

export const initiateCryptoPayment = async (amount: number, currency: string, orderId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('crypto-payment', {
      body: { amount, currency, orderId }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Crypto payment error:', error);
    throw error;
  }
};