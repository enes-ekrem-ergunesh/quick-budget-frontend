import { useState } from "react";
import { Button } from "../ui/button";
import { EmojiPicker } from "../ui/emoji-picker";
import type { EmojiClickData } from "emoji-picker-react/primitives";


export function EmojiPickerButton({emoji, setEmoji}: {emoji: string, setEmoji: React.Dispatch<React.SetStateAction<string>>}) {
  const [visible, setVisible] = useState(false);

  function handleOnButtonClick(){
    setVisible(!visible)
  }

  function handleOnEmojiClick(emojiData: EmojiClickData){
    setEmoji(emojiData.emoji)
    setVisible(false)
  }

  return (
    <>
      <Button variant="ghost" onClick={handleOnButtonClick}>
        {emoji}
      </Button>
      <div hidden={!visible} className="absolute top-10">

      <EmojiPicker onEmojiClick={handleOnEmojiClick}/>
      </div>
    </>
  );
}
