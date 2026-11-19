import { DatePickerTime } from "@/components/layout/date-picker-time";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES } from "@/lib/constants";
import { useState } from "react";
import { postEntryFormFields } from "../constants";
import { Textarea } from "@/components/ui/textarea";
import type { CategoryItem } from "../types";

export function NewEntryForm({
  handleSubmit,
  categoryItems,
}: {
  handleSubmit: any;
  categoryItems: CategoryItem[];
}) {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [fieldAmount, setFieldAmount] = useState<string | null>("0");
  const [fieldDate, setFieldDate] = useState<string | null>(null);
  const [fieldTime, setFieldTime] = useState<string | null>(null);

  async function handlePreSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitDisabled) return;
    setSubmitDisabled(true);

    const formData = new FormData(e.target);
    if (fieldAmount) formData.set(postEntryFormFields.amount, fieldAmount);
    if (fieldDate) formData.set(postEntryFormFields.date, fieldDate);
    if (fieldTime) formData.set(postEntryFormFields.time, fieldTime);

    await handleSubmit(formData);
    setSubmitDisabled(false);
  }

  function updateAmount(value: string) {
    if (value == "") {
      setFieldAmount("0");
      return;
    }
    try {
      parseFloat(value);
    } catch (error) {
      console.log("Can't update amount to: " + value);
      return;
    } finally {
      if (value.includes(".")) {
        if (value.split(".")[1].length > 2) return;
      }
      setFieldAmount(value.replace(/^0+(?=\d)/, ""));
    }
  }

  return (
    <>
      <form id={postEntryFormFields.form} onSubmit={handlePreSubmit}>
        {/* Submit Button */}
        <Button
          variant="link"
          type="submit"
          form={postEntryFormFields.form}
          className="absolute top-3 right-3 hover:no-underline hover:cursor-pointer"
          disabled={submitDisabled}
        >
          Save
        </Button>
        {/* Type */}
        <RadioGroup
          id={postEntryFormFields.type}
          name={postEntryFormFields.type}
          className="flex"
        >
          <FieldLabel htmlFor="new-entry-form-type-income">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Income</FieldTitle>
              </FieldContent>
              <RadioGroupItem
                value="income"
                id="new-entry-form-type-income"
                className="opacity-0"
              />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="new-entry-form-type-expense">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Expense</FieldTitle>
              </FieldContent>
              <RadioGroupItem
                value="expense"
                id="new-entry-form-type-expense"
                className="opacity-0"
              />
            </Field>
          </FieldLabel>
        </RadioGroup>
        <br />
        {/* Amount & Currency */}
        <div className="flex gap-3">
          <Field>
            <FieldLabel htmlFor={postEntryFormFields.amount}>Amount</FieldLabel>
            <Input
              id={postEntryFormFields.amount}
              name={postEntryFormFields.amount}
              type="number"
              value={fieldAmount ? fieldAmount : 0}
              onChange={(e) => updateAmount(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={postEntryFormFields.currency}>
              Currency
            </FieldLabel>
            <Select
              id={postEntryFormFields.currency}
              items={CURRENCIES}
              name={postEntryFormFields.currency}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <br />
        {/* Title */}
        <Field>
          <FieldLabel htmlFor={postEntryFormFields.title}>Title</FieldLabel>
          <Input
            id={postEntryFormFields.title}
            name={postEntryFormFields.title}
          />
        </Field>
        <br />
        {/* Category */}
        <Field>
          <FieldLabel htmlFor={postEntryFormFields.category}>
            Category
          </FieldLabel>
          <Select
            id={postEntryFormFields.category}
            items={categoryItems}
            name={postEntryFormFields.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {categoryItems.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <br />
        {/* Date & Time */}
        <DatePickerTime
          date={fieldDate ? new Date(fieldDate) : null}
          setDate={(date) =>
            setFieldDate(
              date
                ? new Date(date.toString()).toLocaleDateString("en-CA")
                : null,
            )
          }
          time={fieldTime}
          setTime={setFieldTime}
        />
        <br />
        {/* Note */}
        <Field>
          <FieldLabel htmlFor={postEntryFormFields.note}>Note</FieldLabel>
          <Textarea
            id={postEntryFormFields.note}
            name={postEntryFormFields.note}
          />
        </Field>
        <br />
      </form>
    </>
  );
}
