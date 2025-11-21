export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!regex.test(email)) return "Invalid email format";
  return "";
};

export const validatePassword = (password) => {
  // At least 6 chars (you can upgrade rules as required)
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return "";
};

export const validateMobile = (mobile) => {
  // Allows 10 digits only (you can adjust for country)
  const regex = /^[0-9]{10}$/;
  if (!mobile) return "Mobile number is required";
  if (!regex.test(mobile)) return "Mobile must be a 10-digit number";
  return "";
};
