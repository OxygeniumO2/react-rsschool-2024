const checkPasswordStrength = (password: string) => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const hasLength = password.length >= 6;

  const fulfilledCriteria = [
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    hasLength,
  ].filter(Boolean).length;

  if (fulfilledCriteria === 5) {
    return 'Strong';
  } else if (fulfilledCriteria >= 3) {
    return 'Medium';
  } else {
    return 'Weak';
  }
};

export default checkPasswordStrength;
