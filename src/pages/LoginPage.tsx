import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "@/hooks/useAuth";
import logo from "@/assets/cbe-logo.jpg";

interface LoginPageProps {
  onCreateAccount?: () => void;
}

const LoginPage = ({ onCreateAccount }: LoginPageProps) => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
      return;
    }

    loginMutation.mutate(
      { email: username, password: password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
        onError: (err: any) => {
          setErrorMessage(err.message || "Login failed. Please try again.");
        },
      }
    );
  };

  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount();
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <img
            src={logo}
            alt="Commercial Bank of Ethiopia Logo"
            className="mx-auto h-20 w-20 object-contain"
          />
        </div>

        <h1 className="text-[#5D0049] text-2xl font-bold mb-2">የኢትዮጵያ ንግድ ባንክ</h1>
        <h2 className="text-yellow-600 text-xl font-semibold mb-4">Commercial Bank of Ethiopia</h2>

        <div className="w-full max-w-md mx-auto">
          <hr className="border-[#5D0049]/30 mb-4" />
          <p className="text-[#5D0049] text-lg">Subscription Management System</p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-200">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Enter your credentials to access the subscription system
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Username or Email
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMessage("");
                }}
                className="h-12 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049]"
                required
                disabled={loginMutation.isPending}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] pr-12"
                  required
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {(errorMessage || loginMutation.isError) && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  {errorMessage || (loginMutation.error as Error)?.message}
                </p>
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-12 bg-[#5D0049] hover:bg-[#4A0039] text-white font-semibold text-base mt-6 transition-colors"
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In to CBE System"}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button className="text-gray-600 hover:text-[#5D0049] text-sm font-medium transition-colors">
              Forgot Password?
            </button>
            <button
              onClick={handleCreateAccount}
              className="text-[#5D0049] hover:text-[#4A0039] text-sm font-medium transition-colors"
            >
              Create Account
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Footer */}
      <div className="text-center mt-8 text-[#5D0049]/80 space-y-2">
        <p className="text-sm">Secure Banking • Trusted Service • Excellence in Finance</p>
        <p className="text-xs text-[#5D0049]/60">© 2025 Commercial Bank of Ethiopia. All rights reserved.</p>
        <p className="text-xs text-[#5D0049]/60">Subscription Management System v1.0</p>
      </div>
    </div>
  );
};

export default LoginPage;
