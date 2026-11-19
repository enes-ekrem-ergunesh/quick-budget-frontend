"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerTime({
  date,
  setDate,
  time,
  setTime,
}: {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  time: string | null;
  setTime: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <FieldGroup className="flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-optional"
                className="w-32 justify-between font-normal"
              >
                {date ? format(date, "PPP") : "Select date"}
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            }
          />
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date?date:undefined}
              captionLayout="dropdown"
              defaultMonth={date?date:undefined}
              onSelect={(date) => {
                setDate(date?date:null);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field>
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          value={time?time:""}
          onChange={(e) => {
            const value = e.target.value
            setTime(value?value:null);
          }}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}
