import { supabase } from "@/integrations/supabase/client";

export const initiateMpesaPayment = async (amount: number, phoneNumber: string, orderId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('mpesa-payment', {
      body: { amount, phoneNumber, orderId }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Mpesa payment error:', error);
    throw error;
  }
};