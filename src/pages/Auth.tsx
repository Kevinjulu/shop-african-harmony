import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in successfully:", session.user);
        toast.success("Signed in successfully!");
        
        // Check if user is admin
        const checkAdminStatus = async () => {
          const { data: adminProfile, error } = await supabase
            .from('admin_profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          if (adminProfile?.is_admin) {
            console.log("Admin user detected");
            navigate("/admin");
          } else {
            navigate("/");
          }
        };

        checkAdminStatus();
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        toast.info("Signed out successfully");
      } else if (event === 'PASSWORD_RECOVERY') {
        console.log("Password recovery event detected");
        toast.info("Please enter your new password below");
      } else if (event === 'USER_UPDATED') {
        console.log("User profile updated");
        toast.success("Profile updated successfully");
      } else if (event === 'VERIFICATION_EMAIL_SENT') {
        console.log("Verification email sent");
        toast.info("Verification email sent. Please check your inbox.");
      }
    });

    // Check current session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Active session found:", session.user);
        
        // Check if user is admin
        const { data: adminProfile } = await supabase
          .from('admin_profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (adminProfile?.is_admin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    };
    
    checkSession();

    // Handle password reset
    const handlePasswordReset = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('type=recovery')) {
        console.log("Password reset hash detected");
        toast.info("Please enter your new password below");
      }
    };

    handlePasswordReset();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="absolute top-8 left-8">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <img
          src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png"
          alt="Shop African Brands"
          className="mx-auto h-12 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <span className="font-medium text-primary">
            create a new account
          </span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000000',
                    brandAccent: '#666666',
                  },
                },
              },
            }}
            theme="light"
            providers={[]}
            redirectTo={window.location.origin}
            onlyThirdPartyProviders={false}
            view="sign_in"
            showLinks={true}
            magicLink={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;