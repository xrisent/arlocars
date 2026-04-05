import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import { ReactNode } from "react";

import "./custom-input.scss";

interface IInputProps {
  name?: string;
  type: string;
  rules?: Rule[];
  label?: string;
  prefix?: ReactNode;
  className?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | (() => void);
  disabled?: boolean;
  placeholder?: string;
  inputClassName?: string;
  defaultValue?: string;
  onPressEnter?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export const CustomInput = ({
  label,
  type,
  className,
  name,
  rules,
  value,
  onChange,
  disabled,
  placeholder,
  prefix,
  inputClassName,
  defaultValue,
  onPressEnter,
  onBlur,
  autoFocus,
}: IInputProps) => {
  return (
    <Form.Item
      layout="vertical"
      label={label}
      name={name}
      rules={rules}
      className={`CustomInput ${className}`}
      normalize={type === "number" ? (val) => (val === "" ? undefined : val) : undefined}
    >
      <Input
        autoFocus={autoFocus}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        prefix={prefix}
        className={inputClassName}
        defaultValue={defaultValue}
        onPressEnter={onPressEnter}
        onBlur={onBlur}
      />
    </Form.Item>
  );
};
