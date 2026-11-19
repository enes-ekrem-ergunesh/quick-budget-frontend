import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { CategoryItem, PatchEntry } from "../types";
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
import { DatePickerTime } from "@/components/layout/date-picker-time";
import { patchEntryFormFields } from "../constants";
import { Textarea } from "@/components/ui/textarea";

export function PatchEntryForm({
  handleSubmit,
  categoryItems,
  patchEntry,
  handleDelete,
}: {
  handleSubmit: any;
  categoryItems: CategoryItem[];
  patchEntry: PatchEntry;
  handleDelete: any;
}) {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [fieldCategory, setFieldCategory] = useState(patchEntry.category_id);
  const [fieldTitle, setFieldTitle] = useState(patchEntry.title);
  const [fieldAmount, setFieldAmount] = useState(patchEntry.amount);
  const [fieldCurrency, setFieldCurrency] = useState(patchEntry.currency);
  const [fieldType, setFieldType] = useState(patchEntry.type);
  const [fieldDate, setFieldDate] = useState(patchEntry.entry_date);
  const [fieldTime, setFieldTime] = useState(patchEntry.entry_time);
  const [fieldNote, setFieldNote] = useState(patchEntry.note);

  async function handlePreSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitDisabled) return;
    setSubmitDisabled(true);

    const formData: FormData = new FormData(e.target);
    if (fieldCategory)
      formData.set(patchEntryFormFields.category, fieldCategory);
    if (fieldTitle) formData.set(patchEntryFormFields.title, fieldTitle);
    if (fieldAmount)
      formData.set(patchEntryFormFields.amount, fieldAmount.toString());
    if (fieldCurrency)
      formData.set(patchEntryFormFields.currency, fieldCurrency);
    if (fieldType) formData.set(patchEntryFormFields.type, fieldType);
    if (fieldDate) {
      formData.set(
        patchEntryFormFields.date,
        new Date(fieldDate).toLocaleDateString("en-CA"),
      );
    }
    if (fieldTime) formData.set(patchEntryFormFields.time, fieldTime);
    if (fieldNote) formData.set(patchEntryFormFields.note, fieldNote);
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
      setFieldAmount(value);
    }
  }

  return (
    <>
      <form id={patchEntryFormFields.form} onSubmit={handlePreSubmit}>
        {/* Submit Button */}
        <Button
          variant="link"
          type="submit"
          form={patchEntryFormFields.form}
          className="absolute top-3 right-3 hover:no-underline hover:cursor-pointer"
          disabled={submitDisabled}
        >
          Save
        </Button>
        {/* Type */}
        <RadioGroup
          id={patchEntryFormFields.type}
          name={patchEntryFormFields.type}
          value={fieldType}
          onValueChange={(value) => setFieldType(value)}
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
            <FieldLabel htmlFor={patchEntryFormFields.amount}>
              Amount
            </FieldLabel>
            <Input
              id={patchEntryFormFields.amount}
              name={patchEntryFormFields.amount}
              type="number"
              value={fieldAmount ? fieldAmount : 0}
              onChange={(e) => updateAmount(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={patchEntryFormFields.currency}>
              Currency
            </FieldLabel>
            <Select
              id={patchEntryFormFields.currency}
              items={CURRENCIES}
              name={patchEntryFormFields.currency}
              value={fieldCurrency}
              onValueChange={(value) => setFieldCurrency(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
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
          <FieldLabel htmlFor={patchEntryFormFields.title}>Title</FieldLabel>
          <Input
            id={patchEntryFormFields.title}
            name={patchEntryFormFields.title}
            value={fieldTitle}
            onChange={(e) => setFieldTitle(e.target.value)}
          />
        </Field>
        <br />
        {/* Category */}
        <Field>
          <FieldLabel htmlFor={patchEntryFormFields.category}>
            Category
          </FieldLabel>
          <Select
            id={patchEntryFormFields.category}
            items={categoryItems}
            name={patchEntryFormFields.category}
            value={fieldCategory}
            onValueChange={setFieldCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Theme" />
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
            setFieldDate(date ? date.toLocaleString("en-CA") : null)
          }
          time={fieldTime}
          setTime={setFieldTime}
        />
        <br />
        {/* Note */}
        <Field>
          <FieldLabel htmlFor={patchEntryFormFields.note}>Note</FieldLabel>
          <Textarea
            id={patchEntryFormFields.note}
            name={patchEntryFormFields.note}
            value={fieldNote ? fieldNote : ""}
            onChange={(e) => setFieldNote(e.target.value)}
          />
        </Field>
        <br />
      </form>

      <Button variant="destructive" className="w-full" onClick={handleDelete}>Delete Entry</Button>
    </>
  );
}
