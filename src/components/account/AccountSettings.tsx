import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AccountSettings = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button variant="outline" className="w-full md:w-auto block mb-2">
            Change Password
          </Button>
          <Button variant="outline" className="w-full md:w-auto block mb-2">
            Notification Preferences
          </Button>
          <Button variant="outline" className="w-full md:w-auto block mb-4">
            Privacy Settings
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="w-full md:w-auto"
          >
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};