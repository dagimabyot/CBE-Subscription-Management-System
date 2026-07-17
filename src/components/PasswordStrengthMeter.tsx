import { Check, X } from "lucide-react";

interface PasswordStrengthMeterProps {
  password: string;
  showRequirements?: boolean;
}

export const PasswordStrengthMeter = ({
  password,
  showRequirements = true,
}: PasswordStrengthMeterProps) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const passedRequirements = Object.values(requirements).filter(
    (v) => v
  ).length;
  const totalRequirements = Object.keys(requirements).length;
  const strengthPercentage = (passedRequirements / totalRequirements) * 100;

  const getStrengthColor = () => {
    if (strengthPercentage === 0) return "bg-gray-200";
    if (strengthPercentage <= 40) return "bg-red-500";
    if (strengthPercentage <= 60) return "bg-yellow-500";
    if (strengthPercentage <= 80) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    if (strengthPercentage === 0) return "No password";
    if (strengthPercentage <= 40) return "Weak";
    if (strengthPercentage <= 60) return "Fair";
    if (strengthPercentage <= 80) return "Good";
    return "Strong";
  };

  return (
    <div className="space-y-2">
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()} transition-all duration-300`}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600 w-12">
          {getStrengthLabel()}
        </span>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="space-y-1.5">
          <RequirementItem
            label="At least 8 characters"
            passed={requirements.minLength}
          />
          <RequirementItem
            label="One uppercase letter"
            passed={requirements.hasUppercase}
          />
          <RequirementItem
            label="One lowercase letter"
            passed={requirements.hasLowercase}
          />
          <RequirementItem label="One number" passed={requirements.hasNumber} />
          <RequirementItem
            label="One special character"
            passed={requirements.hasSpecialChar}
          />
        </div>
      )}
    </div>
  );
};

const RequirementItem = ({
  label,
  passed,
}: {
  label: string;
  passed: boolean;
}) => (
  <div className="flex items-center gap-2">
    {passed ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-gray-300" />
    )}
    <span
      className={`text-xs ${
        passed ? "text-green-600" : "text-gray-500"
      }`}
    >
      {label}
    </span>
  </div>
);
