// Validation for text input
export function validateTextInput(value) {
  // Trim whitespace
  const trimmedValue = value.trim();

  // Allow only alphabets, numbers, spaces, and some common chars(. , - _ ? !)
  const regex = /^[a-zA-Z0-9\s.,'-]*$/;

  if (!trimmedValue) {
    return { valid: false, error: "This field cannot be empty" };
  }

  if (!regex.test(trimmedValue)) {
    return { valid: false, error: "Invalid characters entered" };
  }

  return { valid: true, error: "" };
}
