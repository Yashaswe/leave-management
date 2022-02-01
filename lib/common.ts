export function validateEmail(email: string) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) throw new Error("Email is required");
  if (!email.match(mailformat)) throw new Error("Email is invalid");
}

export function validatePassword(password: string) {
  if (!password) throw new Error("Password is required");
}
export type Errors = {
  email?: string;
  password?: string;
};
export function validateAuthForm(formData: any) {
  const { email, password } = formData;
  const errors: Errors = {};
  try {
    validateEmail(email);
  } catch (err: any) {
    errors.email = err.message;
  }
  try {
    validatePassword(password);
  } catch (err: any) {
    errors.password = err.message;
  }

  return errors;
}
