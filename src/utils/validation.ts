export const DEMO_USER = { email: "user@test.com", password: "password123", name: "Demo User" };

export const MESSAGES = {
  emailRequired: "Email is required",
  emailInvalid: "Enter a valid email address",
  passwordRequired: "Password is required",
  invalidCredentials: "Invalid email or password",
  nameRequired: "Full name is required",
  phoneRequired: "Phone number is required",
  phoneInvalid: "Enter a valid phone number (7–15 digits)",
  addressRequired: "Address is required",
  cityRequired: "City is required",
  postalRequired: "Postal code is required",
  postalInvalid: "Enter a valid postal code",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Errors<K extends string> = Partial<Record<K, string>>;

export function validateEmail(v: string): string | undefined {
  if (!v.trim()) return MESSAGES.emailRequired;
  if (!EMAIL_RE.test(v.trim())) return MESSAGES.emailInvalid;
  return undefined;
}

export function validateLogin(email: string, password: string): Errors<"email" | "password"> {
  const e: Errors<"email" | "password"> = {};
  const em = validateEmail(email);
  if (em) e.email = em;
  if (!password) e.password = MESSAGES.passwordRequired;
  return e;
}

export function checkCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password;
}

export type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

export function validateCheckout(f: CheckoutForm): Errors<keyof CheckoutForm> {
  const e: Errors<keyof CheckoutForm> = {};
  if (!f.fullName.trim()) e.fullName = MESSAGES.nameRequired;
  const em = validateEmail(f.email);
  if (em) e.email = em;
  const digits = f.phone.replace(/[\s()+-]/g, "");
  if (!f.phone.trim()) e.phone = MESSAGES.phoneRequired;
  else if (!/^\d{7,15}$/.test(digits)) e.phone = MESSAGES.phoneInvalid;
  if (!f.address.trim()) e.address = MESSAGES.addressRequired;
  if (!f.city.trim()) e.city = MESSAGES.cityRequired;
  if (!f.postalCode.trim()) e.postalCode = MESSAGES.postalRequired;
  else if (!/^[A-Za-z0-9 -]{3,10}$/.test(f.postalCode.trim())) e.postalCode = MESSAGES.postalInvalid;
  return e;
}
