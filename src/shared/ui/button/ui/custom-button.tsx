import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";
import { ReactNode } from "react";

import "./custom-button.scss";

export interface ButtonProps extends Omit<AntdButtonProps, "variant"> {
  children?: ReactNode;
  width?: number | string;
  variant?: "default" | "secondary";
  active?: boolean;
}

export const CustomButton = ({
  children,
  className,
  variant = "default",
  width,
  active = false,
  ...rest
}: ButtonProps) => {
  return (
    <AntdButton
      className={`${className} CustomButton-${variant} ${active ? "active" : ""}`}
      style={{ minWidth: width }}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};
