import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useForgotPassword } from "@/hooks/useAuth";
import { validateEmail } from "@/utils/validation";
import logo from "@/assets/cbe-logo.jpg";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            navigate("/reset-password");
          }, 2000);
        },
        onError: (err: any) => {
          setError(err.message || "Failed to send reset email. Please try again.");
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-4">
            We&apos;ve sent password reset instructions to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Follow the link in the email to reset your password. The link will expire in 24 hours.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="w-full mt-8 bg-[#5D0049] hover:bg-[#4A0039] text-white"
          >
            Back to Login
          </Button>
        </div>
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
          <CardTitle className="text-2xl font-bold text-gray-800">Reset Password</CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Enter your email address and we&apos;ll send you instructions to reset your password
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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@cbebank.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="h-12 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049]"
                disabled={forgotPasswordMutation.isPending}
                required
              />
              <p className="text-xs text-gray-500">
                We&apos;ll send a password reset link to this address
              </p>
            </div>

            <Button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="w-full h-12 bg-[#5D0049] hover:bg-[#4A0039] text-white font-semibold text-base transition-colors"
            >
              {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full h-12 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Back to Login
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

export default ForgotPasswordPage;
