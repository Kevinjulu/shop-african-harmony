import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaymentService, PaymentProvider } from "@/services/payments/PaymentService";
import { toast } from "sonner";
import { CreditCard, Banknote, Bitcoin } from "lucide-react";

interface PaymentDetails {
  email?: string;
  phoneNumber?: string;
}

interface PaymentMethodSelectorProps {
  amount: number;
  currency: string;
  orderId: string;
  onPaymentComplete: () => void;
}

export const PaymentMethodSelector = ({
  amount,
  currency,
  orderId,
  onPaymentComplete
}: PaymentMethodSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentProvider>('mpesa');
  const [details, setDetails] = useState<PaymentDetails>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      console.log('Initiating payment with:', { selectedMethod, details, amount, currency, orderId });
      
      await PaymentService.initiatePayment(selectedMethod, {
        amount,
        currency,
        orderId,
        ...details
      });

      toast.success('Payment initiated successfully');
      onPaymentComplete();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        value={selectedMethod}
        onValueChange={(value) => setSelectedMethod(value as PaymentProvider)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="relative p-4 hover:border-orange-500 transition-colors cursor-pointer">
          <RadioGroupItem value="mpesa" id="mpesa" className="absolute right-4 top-4" />
          <Label htmlFor="mpesa" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-full">
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <span>M-Pesa</span>
          </Label>
        </Card>

        <Card className="relative p-4 hover:border-orange-500 transition-colors cursor-pointer">
          <RadioGroupItem value="paystack" id="paystack" className="absolute right-4 top-4" />
          <Label htmlFor="paystack" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span>Paystack</span>
          </Label>
        </Card>

        <Card className="relative p-4 hover:border-orange-500 transition-colors cursor-pointer">
          <RadioGroupItem value="flutterwave" id="flutterwave" className="absolute right-4 top-4" />
          <Label htmlFor="flutterwave" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-500 rounded-full">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span>Flutterwave</span>
          </Label>
        </Card>

        <Card className="relative p-4 hover:border-orange-500 transition-colors cursor-pointer">
          <RadioGroupItem value="coingate" id="coingate" className="absolute right-4 top-4" />
          <Label htmlFor="coingate" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center bg-yellow-500 rounded-full">
              <Bitcoin className="w-5 h-5 text-white" />
            </div>
            <span>Cryptocurrency</span>
          </Label>
        </Card>
      </RadioGroup>

      <div className="space-y-4">
        {(selectedMethod === 'paystack' || selectedMethod === 'flutterwave') && (
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={details.email || ''}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              placeholder="Enter your email"
              className="mt-1"
            />
          </div>
        )}

        {selectedMethod === 'mpesa' && (
          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={details.phoneNumber || ''}
              onChange={(e) => setDetails({ ...details, phoneNumber: e.target.value })}
              placeholder="Enter M-Pesa number"
              className="mt-1"
            />
          </div>
        )}

        <Button 
          onClick={handlePayment} 
          disabled={isProcessing}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {isProcessing ? 'Processing...' : `Pay ${currency} ${amount}`}
        </Button>
      </div>
    </div>
  );
};