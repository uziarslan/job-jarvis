import React, { useState, useEffect, useRef } from "react";
import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonItalic,
  MenuButtonTaskList,
  MenuButtonUnderline,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
} from "mui-tiptap";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import { styled } from "@mui/material";
import { Popover, IconButton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface IProps {
  content: string;
  setContent: (content: string) => void;
  height?: number;
  extraControls?: React.FC<{ editor: any }>[];
  extraExtensions?: any[];
}

const RichTextEditorWithStyle = styled(RichTextEditor) <{ height?: number }>`
  border: none !important;
  border-radius: 8px !important;
  box-shadow: 0px 0px 3px 0px #00000040 !important;
  outline: none !important;

  &:hover {
    border: none !important;
    outline: none !important;
  }

  &:focus {
    border: none !important;
    outline: none !important;
  }

  & .MuiTiptap-RichTextContent-root {
    border: none !important;
    border-radius: 8px !important;
    outline: none !important;
  }

  & .ProseMirror {
    min-height: ${({ height }) => height}px;
    max-height: ${({ height }) => height}px;
    height: 100%;
    box-sizing: border-box;
    cursor: text;
    border: none !important;
    border-radius: 8px !important;
    box-shadow: none !important;
    outline: none !important;
    transition: none !important;
    overflow-y: auto;
  }
`;

interface EmojiMenuButtonProps {
  editor: any;
}

export const EmojiMenuButton: React.FC<EmojiMenuButtonProps> = ({ editor }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!editor) {
      console.warn("Editor instance is not ready");
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    if (!editor) return;
    editor.chain().focus().insertContent(emojiData.emoji).run();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} disabled={!editor}>
        <EmojiEmotionsIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <EmojiPicker onEmojiClick={handleEmojiSelect} />
      </Popover>
    </>
  );
};

export default function RichTextArea({
  content,
  setContent,
  height = 350,
  extraControls = [],
  extraExtensions = [],
}: IProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false); // false = don't emit transaction
    }
  }, [content]);

  return (
    <RichTextEditorWithStyle
      ref={editorRef}
      height={height}
      extensions={[StarterKit, Underline, TaskList, TaskItem, ...extraExtensions]}
      content={content}
      onUpdate={(e) => setContent(e.editor.getHTML())}
      renderControls={(editor) => (
        <MenuControlsContainer>
          {extraControls.map((Control, idx) => (
            <Control key={idx} editor={editor} />
          ))}
          <MenuSelectHeading />
          <MenuDivider />
          <MenuButtonBold />
          <MenuButtonItalic />
          <MenuButtonUnderline />
          <MenuButtonBulletedList />
          <MenuButtonTaskList />
        </MenuControlsContainer>
      )}
    />
  );
}
