import { supabase } from "@/integrations/supabase/client";

export const initiatePaystackPayment = async (amount: number, email: string, orderId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('paystack-payment', {
      body: { amount, email, orderId }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Paystack payment error:', error);
    throw error;
  }
};