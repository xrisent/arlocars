import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";

export const validatePhoneNumber = (value: string, country: string): boolean => {
  if (!value) return false;

  try {
    const phoneNumber = parsePhoneNumberFromString(value, country as CountryCode);
    return phoneNumber ? phoneNumber.isValid() : false;
  } catch (error) {
    return false;
  }
};
