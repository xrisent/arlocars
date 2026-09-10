import "./custom-select.scss";

export interface CustomSelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}

export const CustomSelect = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  className,
  "aria-label": ariaLabel,
}: CustomSelectProps) => {
  return (
    <select
      id={id}
      name={name}
      aria-label={ariaLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`CustomSelect ${className ?? ""}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
