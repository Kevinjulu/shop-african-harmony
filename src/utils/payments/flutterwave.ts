import { supabase } from "@/integrations/supabase/client";

export const initiateFlutterwavePayment = async (amount: number, email: string, orderId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('flutterwave-payment', {
      body: { amount, email, orderId }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Flutterwave payment error:', error);
    throw error;
  }
};