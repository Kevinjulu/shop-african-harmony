import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  payout_method: string;
}

export const PayoutManagement = () => {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [payoutMethod, setPayoutMethod] = useState("bank_transfer");
  const [accountDetails, setAccountDetails] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchPayouts = async () => {
      const { data, error } = await supabase
        .from('vendor_payouts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payouts:', error);
        toast.error('Failed to load payouts');
        return;
      }

      setPayouts(data || []);
      setLoading(false);
    };

    fetchPayouts();

    // Subscribe to payout updates
    const channel = supabase
      .channel('vendor-payouts')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'vendor_payouts'
      }, () => {
        fetchPayouts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const requestPayout = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const { error } = await supabase
        .from('vendor_payouts')
        .insert({
          amount: Number(amount),
          currency: 'USD', // Default currency, could be made dynamic
          payout_method: payoutMethod,
          status: 'pending',
          payout_details: { account_details: accountDetails }
        });

      if (error) throw error;
      
      toast.success('Payout request submitted successfully');
      setAccountDetails('');
      setAmount('');
    } catch (error) {
      console.error('Error requesting payout:', error);
      toast.error('Failed to submit payout request');
    }
  };

  if (loading) {
    return <div>Loading payout information...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Request Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Select
                value={payoutMethod}
                onValueChange={setPayoutMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payout method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Input
              placeholder="Enter account details"
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
            />

            <Button onClick={requestPayout}>Request Payout</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payouts.map((payout) => (
              <div
                key={payout.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: payout.currency
                    }).format(payout.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(payout.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Badge
                    variant={
                      payout.status === 'completed'
                        ? 'default'
                        : payout.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {payout.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};