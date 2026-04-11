import { ReactNode } from "react";

export interface CustomCardGridProps {
  data?: any[];
  children?: ReactNode;
  loading?: boolean;
  className?: string;
  gridClassName?: string;
  pagination?: {
    current: number;
    pageSize: number;
    total?: number;
    onChange: (page: number, pageSize?: number) => void;
  };
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  gutter?: [number, number];
  skeleton?: ReactNode;
}
