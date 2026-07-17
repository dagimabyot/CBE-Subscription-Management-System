import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useResetPassword } from "@/hooks/useAuth";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";
import { isStrongPassword } from "@/utils/validation";
import logo from "@/assets/cbe-logo.jpg";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetPasswordMutation = useResetPassword();
  
  const token = searchParams.get("token") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("Password does not meet strength requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    resetPasswordMutation.mutate(
      { token, newPassword: password, confirmPassword },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (err: any) => {
          setError(err.message || "Failed to reset password. Please try again.");
        },
      }
    );
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successfully</h2>
          <p className="text-gray-600 mb-4">
            Your password has been reset. You can now sign in with your new password.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-[#5D0049] hover:bg-[#4A0039] text-white"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-200">
          <CardContent className="pt-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Invalid Reset Link</h3>
            <p className="text-gray-600 text-center mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Button
              onClick={() => navigate("/forgot-password")}
              className="w-full bg-[#5D0049] hover:bg-[#4A0039] text-white"
            >
              Request New Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Header */}
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
      </div>

      {/* Card */}
      <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-200">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-start mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Create New Password</CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Enter a strong password to secure your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Error Alert */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] pr-12"
                  disabled={resetPasswordMutation.isPending}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={resetPasswordMutation.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Strength Meter */}
            {password && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <PasswordStrengthMeter password={password} showRequirements={true} />
              </div>
            )}

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] pr-12"
                  disabled={resetPasswordMutation.isPending}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={resetPasswordMutation.isPending}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="w-full h-12 bg-[#5D0049] hover:bg-[#4A0039] text-white font-semibold text-base transition-colors"
            >
              {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#5D0049] hover:text-[#4A0039] font-medium"
            >
              Sign in here
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
