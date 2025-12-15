import { useState } from "react";
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
import { ArrowLeft, Eye, EyeOff, User, Briefcase, Shield } from "lucide-react";
import logo from "@/assets/cbe-logo.jpg";

const RegistrationPage = () => {
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <img src={logo} alt="CBE Logo" className="mx-auto h-24 mb-4" />
          <h1 className="text-base text-gray-600">
            Commercial Bank of Ethiopia
          </h1>
          <p className="text-sm text-gray-500">Create New Account</p>
        </div>
        <Card className="bg-white border rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto hover:bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            <CardTitle className="text-center text-lg font-medium text-gray-800">
              Employee Registration
            </CardTitle>
            <p className="text-center text-sm text-gray-500">
              Register for access to the subscription management system
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4" /> Personal Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="fullName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Your Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="employeeId">Employee Id *</Label>
                    <Input
                      id="employeeId"
                      placeholder="Your Employee ID"
                      value={formData.employeeId}
                      onChange={(e) =>
                        handleInputChange("employeeId", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
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
                    <Label>Branch *</Label>
                    <Input
                      placeholder="Your Branch Name"
                      value={formData.branch}
                      onChange={(e) =>
                        handleInputChange("branch", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Department *</Label>
                    <Select
                      onValueChange={(v) => handleInputChange("department", v)}
                    >
                      <SelectTrigger className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition z-10">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Role *</Label>
                  <Select onValueChange={(v) => handleInputChange("role", v)}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition z-10">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent className="z-[60]">
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="officer">Officer</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </section>

              <Separator />

              {/* Security Info */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Shield className="h-4 w-4" /> Security Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 relative">
                    <Label>Password *</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                  <div className="space-y-1 relative">
                    <Label>Confirm Password *</Label>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-6"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters and contain a mix of
                  letters, numbers, and symbols.
                </p>
              </section>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(v) => handleInputChange("agreeTerms", !!v)}
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I agree to the
                  <span className="text-blue-600 underline">
                    Terms
                  </span> and{" "}
                  <span className="text-blue-600 underline">
                    Privacy Policy
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 text-white font-mediu bg-purple-600 hover:bg-purple-700 transition"
              >
                Create Account
              </Button>
            </form>
            <div className="text-center text-sm text-gray-500">
              Already registered?
              <span className="text-blue-600 underline cursor-pointer">
                Sign in here
              </span>
              <p className="text-xs mt-1">
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
