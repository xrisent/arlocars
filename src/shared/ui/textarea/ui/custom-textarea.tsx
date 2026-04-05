import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import React, { ReactNode } from "react";

const { TextArea } = Input;

import "./custom-textarea.scss";

interface ICustomTextAreaProps {
  name?: string;
  rules?: Rule[];
  label?: string;
  prefix?: ReactNode;
  className?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLTextAreaElement>) => void) | (() => void);
  disabled?: boolean;
  placeholder?: string;
  inputClassName?: string;
  defaultValue?: string;
  onPressEnter?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export const CustomTextArea = ({
  label,
  className,
  name,
  rules,
  value,
  onChange,
  disabled,
  placeholder,
  inputClassName,
  defaultValue,
  onPressEnter,
  onBlur,
  autoFocus,
}: ICustomTextAreaProps) => {
  return (
    <Form.Item
      layout="vertical"
      label={label}
      name={name}
      rules={rules}
      className={`CustomTextArea ${className}`}
    >
      <TextArea
        autoFocus={autoFocus}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={inputClassName}
        defaultValue={defaultValue}
        onPressEnter={onPressEnter}
        onBlur={onBlur}
        style={{ resize: "none" }}
      />
    </Form.Item>
  );
};
