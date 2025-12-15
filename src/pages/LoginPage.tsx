// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, EyeOff, Shield } from "lucide-react";

import { useLogin } from "@/hooks/useAuth"; // ✅ custom React Query hook
import logo from "@/assets/cbe-logo.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin(); // useLogin hook
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email: formData.email, password: formData.password },
      {
        onSuccess: () => {
          // Redirect after successful login
          navigate("/dashboard");
        },
        onError: (err: any) => {
          console.error("Login error:", err.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="CBE Logo" className="mx-auto h-24 mb-4" />
          <h1 className="text-base text-gray-600">
            Commercial Bank of Ethiopia
          </h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <Card className="bg-white border rounded-xl shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            <CardTitle className="text-center text-lg font-medium text-gray-800">
              Employee Login
            </CardTitle>
            <p className="text-center text-sm text-gray-500">
              Access your subscription management portal
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Login Credentials Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Shield className="h-4 w-4" /> Login Credentials
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div className="space-y-1 relative">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full border rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </section>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(v) =>
                      handleInputChange("rememberMe", !!v)
                    }
                  />
                  <label htmlFor="rememberMe" className="text-xs text-gray-600">
                    Remember me
                  </label>
                </div>
                <span className="text-xs text-blue-600 underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-2.5 text-white font-medium bg-purple-600 hover:bg-purple-700 transition"
              >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </Button>

              {/* Error Message */}
              {loginMutation.isError && (
                <p className="text-sm text-red-500 text-center mt-2">
                  {(loginMutation.error as Error).message}
                </p>
              )}
            </form>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
