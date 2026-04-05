import parsePhoneNumberFromString, { CountryCode, getCountryCallingCode } from "libphonenumber-js";

export const cleanPhone = (value: string): string => {
  return value.replace(/[^\d+]/g, "");
};

export const formatPhoneNumber = (value: string, country: string): string => {
  const countryCode = getCountryCallingCode(country as CountryCode);

  const cleanValue = value.replace(/\D/g, "");
  if (!cleanValue) {
    return "";
  }
  const formattedValue = parsePhoneNumberFromString(
    cleanValue.startsWith(countryCode) ? cleanValue.slice(countryCode.length) : cleanValue,
    country as CountryCode,
  );

  if (formattedValue && formattedValue.isValid() && formattedValue.isPossible()) {
    return formattedValue.number;
  }
  return cleanPhone(value);
};
