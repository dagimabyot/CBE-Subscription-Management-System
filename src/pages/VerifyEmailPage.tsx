import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { useVerifyEmail, useResendVerificationEmail } from "@/hooks/useAuth";
import logo from "@/assets/cbe-logo.jpg";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verifyEmailMutation = useVerifyEmail();
  const resendMutation = useResendVerificationEmail();

  const email = (location.state?.email as string) || "";
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Handle resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!verificationCode.trim()) {
      setError("Please enter the verification code");
      return;
    }

    if (verificationCode.length < 4) {
      setError("Verification code should be at least 4 characters");
      return;
    }

    verifyEmailMutation.mutate(
      { email: email || "", verificationCode },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (err: any) => {
          setError(err.message || "Verification failed. Please try again.");
        },
      }
    );
  };

  const handleResendCode = () => {
    if (!canResend || !email) return;

    setError("");
    setCanResend(false);
    setResendTimer(60);

    resendMutation.mutate(email, {
      onSuccess: () => {
        // Show success toast
        console.log("[v0] Verification code resent to", email);
      },
      onError: (err: any) => {
        setError(err.message || "Failed to resend verification code");
        setCanResend(true);
        setResendTimer(0);
      },
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified</h2>
          <p className="text-gray-600 mb-4">
            Your email has been verified successfully. You can now sign in to your account.
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

  if (!email) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-200">
          <CardContent className="pt-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Missing Email Address</h3>
            <p className="text-gray-600 text-center mb-6">
              Please complete the registration process to verify your email.
            </p>
            <Button
              onClick={() => navigate("/register")}
              className="w-full bg-[#5D0049] hover:bg-[#4A0039] text-white"
            >
              Go to Registration
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
          <div className="flex justify-center mb-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Verify Email</CardTitle>
          <CardDescription className="text-gray-600 text-base">
            We&apos;ve sent a verification code to <strong>{email}</strong>
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
              <Label htmlFor="code" className="text-gray-700 font-medium">
                Verification Code
              </Label>
              <Input
                id="code"
                placeholder="Enter 4-6 digit code"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  setError("");
                }}
                className="h-12 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] text-center text-lg tracking-widest"
                disabled={verifyEmailMutation.isPending}
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-500">
                Check your email for the verification code
              </p>
            </div>

            <Button
              type="submit"
              disabled={verifyEmailMutation.isPending}
              className="w-full h-12 bg-[#5D0049] hover:bg-[#4A0039] text-white font-semibold text-base transition-colors"
            >
              {verifyEmailMutation.isPending ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendMutation.isPending}
                  className="text-[#5D0049] hover:text-[#4A0039] font-medium text-sm"
                >
                  {resendMutation.isPending ? "Sending..." : "Resend Code"}
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Resend code in <span className="font-semibold text-gray-700">{resendTimer}s</span>
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full h-12 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Skip for Now
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResendCode}
              disabled={!canResend}
              className={`font-medium ${canResend ? "text-[#5D0049] hover:text-[#4A0039]" : "text-gray-400 cursor-not-allowed"}`}
            >
              Try again
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
