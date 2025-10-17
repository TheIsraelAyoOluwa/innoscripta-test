import { useState, type FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface DatePickerProps {
  label?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
    error?: string;
}

const DatePicker: FC<DatePickerProps> = ({ label = "Select Date", value, onChange, placeholder = "Pick a date", error }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate); // will only run if provided
    }
    setOpen(false);
  };

  return (
    <div className="w-full space-y-0.5 flex flex-col">
      {label && <label className="text-sm text-neutral-900 font-medium">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-[100%] h-[40px] justify-between font-normal">
            <span className="text-sm text-neutral-500">{date ? date.toLocaleDateString() : placeholder}</span>

            <CalendarIcon className="size-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar mode="single" selected={date} captionLayout="dropdown" onSelect={handleSelect} />
        </PopoverContent>
      </Popover>

         {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default DatePicker;
