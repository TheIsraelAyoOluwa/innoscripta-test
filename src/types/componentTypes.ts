export interface SelectInputProps {
  options: Option[];
  name?: string;
  value?: string | undefined | number;
  onChange?:  ((value: string) => void);

  // ;
  css?: string;
  disabled?: boolean;
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  error?: string | undefined | false;
  label?: string;
  placeholder?: string;
}

export interface Option {
  label: string;
  value: string | number;
}