import { EmojiPickerButton } from "@/components/layout/emoji-picker-button";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus } from "lucide-react";
import { useState } from "react";

const DEFAULT_EMOJI = "🍽️";

export function NewCategoryForm({ handleSubmit }: { handleSubmit: any }) {
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function handlePreSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    if (submitDisabled) return;
    setSubmitDisabled(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("new-category-emoji", emoji);
    const submitted = await handleSubmit(formData);
    if (submitted) {
      setEmoji(DEFAULT_EMOJI);
      const title = document.getElementById("new-category-title") as HTMLInputElement;
      title.value = "";
    }
    setSubmitDisabled(false);
  }

  return (
    <>
      <form id="new-category-form" onSubmit={handlePreSubmit}>
        <InputGroup>
          <InputGroupInput
            id="new-category-title"
            name="new-category-title"
            placeholder="Category title..."
            required
          />
          <InputGroupAddon>
            <EmojiPickerButton emoji={emoji} setEmoji={setEmoji} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Button type="submit" variant="ghost" size="icon">
              <Plus />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </>
  );
}
