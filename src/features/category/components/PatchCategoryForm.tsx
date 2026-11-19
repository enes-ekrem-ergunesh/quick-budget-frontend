import { EmojiPickerButton } from "@/components/layout/emoji-picker-button";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function PatchCategoryForm({
  handleSubmit,
  emoji,
  title,
}: {
  handleSubmit: any;
  emoji: string;
  title: string;
}) {
  const [formTitle, setFormTitle] = useState(title);
  const [formEmoji, setFormEmoji] = useState(emoji);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function handlePreSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    if (submitDisabled) return;
    setSubmitDisabled(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("patch-category-emoji", formEmoji);
    await handleSubmit(formData);
    setSubmitDisabled(false);
  }

  return (
    <>
      <form id="patch-category" onSubmit={handlePreSubmit}>
        <EmojiPickerButton emoji={formEmoji} setEmoji={setFormEmoji} />
        <Field>
          <FieldLabel htmlFor="patch-category-title">Title</FieldLabel>
          <Input id="patch-category-title" name="patch-category-title" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
        </Field>
        <br/>
        <Button className="w-full" type="submit">Save</Button>
      </form>
    </>
  );
}
