export const passwordValidation = {
  minLength: (password: string) => password.length >= 8,
  hasUppercase: (password: string) => /[A-Z]/.test(password),
  hasLowercase: (password: string) => /[a-z]/.test(password),
  hasNumber: (password: string) => /\d/.test(password),
  hasSpecialChar: (password: string) =>
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
};

export const isStrongPassword = (password: string): boolean => {
  return (
    passwordValidation.minLength(password) &&
    passwordValidation.hasUppercase(password) &&
    passwordValidation.hasLowercase(password) &&
    passwordValidation.hasNumber(password) &&
    passwordValidation.hasSpecialChar(password)
  );
};

export const getPasswordStrengthScore = (password: string): number => {
  if (!password) return 0;
  const checks = [
    passwordValidation.minLength(password),
    passwordValidation.hasUppercase(password),
    passwordValidation.hasLowercase(password),
    passwordValidation.hasNumber(password),
    passwordValidation.hasSpecialChar(password),
  ];
  return (checks.filter(Boolean).length / 5) * 100;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

export const getValidationError = (
  field: string,
  value: string,
  rules: Record<string, boolean>
): string | null => {
  if (!value.trim()) {
    return `${field} is required`;
  }

  if (field === "email" && !validateEmail(value)) {
    return "Please enter a valid email address";
  }

  if (field === "password") {
    const errors = [];
    if (!rules.minLength) errors.push("at least 8 characters");
    if (!rules.hasUppercase) errors.push("one uppercase letter");
    if (!rules.hasLowercase) errors.push("one lowercase letter");
    if (!rules.hasNumber) errors.push("one number");
    if (!rules.hasSpecialChar) errors.push("one special character");

    if (errors.length > 0) {
      return `Password must contain ${errors.join(", ")}`;
    }
  }

  if (field === "passwordMatch" && !rules.match) {
    return "Passwords do not match";
  }

  if (field === "phone" && value && !validatePhone(value)) {
    return "Please enter a valid phone number";
  }

  return null;
};
