import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, EyeOff, User, Briefcase, Shield, AlertCircle } from "lucide-react";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";
import { useRegister } from "@/hooks/useAuth";
import { getValidationError, validateEmail, isStrongPassword } from "@/utils/validation";
import logo from "@/assets/cbe-logo.jpg";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    phone: "",
    branch: "",
    department: "",
    role: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required fields validation
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.employeeId.trim()) errors.employeeId = "Employee ID is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!validateEmail(formData.email)) errors.email = "Please enter a valid email";
    if (!formData.branch.trim()) errors.branch = "Branch is required";
    if (!formData.department) errors.department = "Department is required";
    if (!formData.role) errors.role = "Role is required";

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!isStrongPassword(formData.password)) {
      errors.password = "Password does not meet strength requirements";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!formData.agreeTerms) {
      errors.agreeTerms = "You must agree to the terms and privacy policy";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        // Redirect to email verification page
        navigate("/verify-email", { state: { email: formData.email } });
      },
      onError: (err: any) => {
        setFieldErrors({
          submit: err.message || "Registration failed. Please try again.",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-white p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <img src={logo} alt="CBE Logo" className="mx-auto h-20 mb-4" />
          <h1 className="text-[#5D0049] text-2xl font-bold mb-2">የኢትዮጵያ ንግድ ባንክ</h1>
          <h2 className="text-yellow-600 text-xl font-semibold mb-4">Commercial Bank of Ethiopia</h2>
          <div className="w-full max-w-md mx-auto">
            <hr className="border-[#5D0049]/30 mb-4" />
            <p className="text-[#5D0049] text-lg">Subscription Management System</p>
          </div>
        </div>
        <Card className="bg-white border border-gray-200 rounded-xl shadow-2xl">
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
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Create Account
            </CardTitle>
            <p className="text-center text-sm text-gray-600">
              Register for access to the subscription management system
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {fieldErrors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{fieldErrors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4" /> Personal Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className={fieldErrors.firstName ? "text-red-600" : ""}>First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] ${fieldErrors.firstName ? "border-red-500 focus:border-red-500" : ""}`}
                      disabled={registerMutation.isPending}
                    />
                    {fieldErrors.firstName && <p className="text-xs text-red-600">{fieldErrors.firstName}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className={fieldErrors.lastName ? "text-red-600" : ""}>Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Your Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] ${fieldErrors.lastName ? "border-red-500 focus:border-red-500" : ""}`}
                      disabled={registerMutation.isPending}
                    />
                    {fieldErrors.lastName && <p className="text-xs text-red-600">{fieldErrors.lastName}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className={fieldErrors.email ? "text-red-600" : ""}>Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                      disabled={registerMutation.isPending}
                    />
                    {fieldErrors.email && <p className="text-xs text-red-600">{fieldErrors.email}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="employeeId" className={fieldErrors.employeeId ? "text-red-600" : ""}>Employee ID *</Label>
                    <Input
                      id="employeeId"
                      placeholder="Your Employee ID"
                      value={formData.employeeId}
                      onChange={(e) =>
                        handleInputChange("employeeId", e.target.value)
                      }
                      className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] ${fieldErrors.employeeId ? "border-red-500 focus:border-red-500" : ""}`}
                      disabled={registerMutation.isPending}
                    />
                    {fieldErrors.employeeId && <p className="text-xs text-red-600">{fieldErrors.employeeId}</p>}
                  </div>
                </div>
              </section>
              <Separator />
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Briefcase className="h-4 w-4" /> Work Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className={fieldErrors.branch ? "text-red-600" : ""}>Branch *</Label>
                    <Input
                      placeholder="Your Branch Name"
                      value={formData.branch}
                      onChange={(e) =>
                        handleInputChange("branch", e.target.value)
                      }
                      className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] ${fieldErrors.branch ? "border-red-500 focus:border-red-500" : ""}`}
                      disabled={registerMutation.isPending}
                    />
                    {fieldErrors.branch && <p className="text-xs text-red-600">{fieldErrors.branch}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label className={fieldErrors.department ? "text-red-600" : ""}>Department *</Label>
                    <Select
                      onValueChange={(v) => handleInputChange("department", v)}
                      value={formData.department}
                      disabled={registerMutation.isPending}
                    >
                      <SelectTrigger className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] z-10 ${fieldErrors.department ? "border-red-500 focus:border-red-500" : ""}`}>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldErrors.department && <p className="text-xs text-red-600">{fieldErrors.department}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className={fieldErrors.role ? "text-red-600" : ""}>Role *</Label>
                  <Select
                    onValueChange={(v) => handleInputChange("role", v)}
                    value={formData.role}
                    disabled={registerMutation.isPending}
                  >
                    <SelectTrigger className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] z-10 ${fieldErrors.role ? "border-red-500 focus:border-red-500" : ""}`}>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent className="z-[60]">
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="officer">Officer</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldErrors.role && <p className="text-xs text-red-600">{fieldErrors.role}</p>}
                </div>
              </section>

              <Separator />

              {/* Security Info */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Shield className="h-4 w-4" /> Security Information
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className={fieldErrors.password ? "text-red-600" : ""}>Password *</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] pr-12 ${fieldErrors.password ? "border-red-500 focus:border-red-500" : ""}`}
                        disabled={registerMutation.isPending}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        disabled={registerMutation.isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="text-xs text-red-600">{fieldErrors.password}</p>}
                  </div>

                  {/* Password Strength Meter */}
                  {formData.password && (
                    <PasswordStrengthMeter password={formData.password} showRequirements={true} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label className={fieldErrors.confirmPassword ? "text-red-600" : ""}>Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`h-10 bg-gray-50 border-gray-200 focus:border-[#5D0049] focus:ring-[#5D0049] pr-12 ${fieldErrors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
                      disabled={registerMutation.isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={registerMutation.isPending}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && <p className="text-xs text-red-600">{fieldErrors.confirmPassword}</p>}
                </div>
              </section>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(v) => handleInputChange("agreeTerms", !!v)}
                  disabled={registerMutation.isPending}
                />
                <label htmlFor="terms" className={`text-xs ${fieldErrors.agreeTerms ? "text-red-600" : "text-gray-600"}`}>
                  I agree to the{" "}
                  <button type="button" className="text-[#5D0049] hover:underline font-medium">
                    Terms and Conditions
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-[#5D0049] hover:underline font-medium">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {fieldErrors.agreeTerms && <p className="text-xs text-red-600">{fieldErrors.agreeTerms}</p>}

              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full h-12 bg-[#5D0049] hover:bg-[#4A0039] text-white font-semibold text-base transition-colors mt-6"
              >
                {registerMutation.isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
              Already registered?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#5D0049] hover:text-[#4A0039] font-medium transition-colors"
              >
                Sign in here
              </button>
              <p className="text-xs mt-2 text-gray-500">
                Registration approval required from your branch manager
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
