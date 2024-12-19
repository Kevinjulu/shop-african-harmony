import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const ProfileSection = ({ profile }: { profile: any }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleEditProfile = () => {
    navigate('/account/edit-profile');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <p className="text-lg">{profile?.full_name || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-lg">{profile?.email}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleEditProfile} variant="outline">
              Edit Profile
            </Button>
            <Button onClick={handleSignOut} variant="destructive">
              Sign Out
            </Button>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};