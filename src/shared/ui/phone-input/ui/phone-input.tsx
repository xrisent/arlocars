"use client";

import { Form } from "antd";
import { Rule } from "antd/es/form";
import { CountryCode } from "libphonenumber-js";
import { FC, useState } from "react";
import PhoneInput from "react-phone-input-2";

import { cleanPhone, formatPhoneNumber, validatePhoneNumber } from "@/shared/utils";

import "react-phone-input-2/lib/style.css";
import "./phone-input.scss";

interface IComponentProps {
  label?: string;
  name?: string | (string | number)[];
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
  rules?: Rule[];
  initialCountry?: CountryCode | string;
  initialValue?: string;
}

export const CustomPhoneInput: FC<IComponentProps> = ({
  name = "phone",
  className,
  label,
  inputClassName,
  disabled = false,
  onChange,
  rules = [],
  initialCountry = "ae",
  initialValue,
}) => {
  const [phoneFieldValue, setPhoneFieldValue] = useState<string>(initialValue || "");
  const [currentCountry, setCurrentCountry] = useState<CountryCode>(
    initialCountry?.toString().toUpperCase() as CountryCode,
  );
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handlePhoneChange = (changedValue: string, country: CountryCode | any) => {
    changedValue = cleanPhone(changedValue);
    if (country && country.countryCode) {
      setCurrentCountry(country.countryCode.toUpperCase());
    }
    const formattedValue = formatPhoneNumber(changedValue, currentCountry);
    setPhoneFieldValue(formattedValue);
    onChange?.(formattedValue);
    if (formattedValue === phoneFieldValue) {
      setRefreshKey((prev) => prev + 1);
    }
  };

  const phoneRules: Rule[] = [
    ...rules,
    {
      validator: async (_, phoneValue) => {
        const isValid = validatePhoneNumber(phoneValue, currentCountry);
        if (phoneValue && (!isValid || phoneValue === "+" || !phoneValue.startsWith("+"))) {
          return Promise.reject(new Error("Not valid phone number"));
        }
        return Promise.resolve();
      },
    },
  ];

  return (
    <Form.Item
      layout="vertical"
      name={name}
      label={label}
      className={`CustomPhoneInput ${className}`}
      rules={phoneRules}
      validateTrigger="onBlur"
      normalize={(valueForNormalize) =>
        valueForNormalize
          ? formatPhoneNumber(cleanPhone(valueForNormalize), currentCountry)
          : cleanPhone(valueForNormalize)
      }
    >
      <div className={`phone-input-container ${inputClassName}`}>
        <PhoneInput
          key={refreshKey}
          country={initialCountry}
          onChange={handlePhoneChange}
          disabled={disabled}
          placeholder={""}
          autoFormat
          value={phoneFieldValue}
          inputProps={{
            name,
          }}
          containerClass="react-tel-input"
          inputClass="form-control"
          buttonClass="flag-dropdown"
          enableLongNumbers
        />
      </div>
    </Form.Item>
  );
};
