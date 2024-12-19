import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  const isResetPassword = location.pathname === '/auth/reset-password';

  const currentOrigin = window.location.origin;
  console.log("Current origin for auth redirect:", currentOrigin);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in successfully:", session.user);
        
        try {
          const { data: adminProfile, error: adminError } = await supabase
            .from('admin_profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          if (adminError) {
            console.error("Error checking admin status:", adminError);
          }

          if (adminProfile?.is_admin) {
            console.log("Admin user detected");
            navigate("/admin");
          } else {
            navigate(from);
          }
          
          toast.success("Signed in successfully!");
        } catch (error) {
          console.error("Error checking admin status:", error);
          navigate(from);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        toast.info("Signed out successfully");
      } else if (event === 'PASSWORD_RECOVERY') {
        console.log("Password recovery event detected");
        toast.info("Please enter your new password below");
      } else if (event === 'USER_UPDATED') {
        console.log("User profile updated");
        toast.success("Profile updated successfully");
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, from]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {isResetPassword ? 'Reset your password' : 'Sign in to your account'}
        </h2>
        {!isResetPassword && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <span className="font-medium text-primary hover:text-primary/90">
              create a new account
            </span>
          </p>
        )}
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
                    brand: '#FDB813',
                    brandAccent: '#FDB813',
                  },
                },
              },
            }}
            theme="light"
            providers={[]}
            redirectTo={`${currentOrigin}/account`}
            onlyThirdPartyProviders={false}
            view={isResetPassword ? "update_password" : "sign_in"}
            showLinks={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;