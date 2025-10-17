import type { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Option, SelectInputProps } from "@/types/componentTypes";
// import type { Option, SelectInputProps } from "@/types/authInterface";

const SelectInput: FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  error,
  label,
  placeholder,
}) => {
  return (
    <div className="space-y-0.5 flex flex-col">
      {label && <label className="text-sm text-neutral-900 font-medium">{label}</label>}

      <Select
        onValueChange={(val: string) => {
          if (typeof onChange === "function") {
            onChange(val);
          }
        }}
        value={value as string || ""}
        defaultValue={value !== undefined ? String(value) : undefined}
      >
        <SelectTrigger className="w-[100%]  h-12">
          <SelectValue className="h-[40px]" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: Option, index) => (
            <SelectItem key={`${option.value}-${index}`} className="text-sm" value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <small className="text-red-500 text-xs transition-all duration-300" data-testid="error message">
          {error}
        </small>
      )}
    </div>
  );
};

export default SelectInput;
