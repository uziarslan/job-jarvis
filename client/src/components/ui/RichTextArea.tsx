import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
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

interface IProps {
  content: string;
  setContent: (content: string) => void;
  height?: number;
}

const RichTextEditorWithStyle = styled(RichTextEditor)<{
  height: number;
}>`
  height: ${({ height }) => height}px;
`;

export default function RichTextArea({
  content,
  setContent,
  height = 200,
}: IProps) {
  return (
    <RichTextEditorWithStyle
      height={height}
      extensions={[StarterKit, Underline, TaskList, TaskItem]}
      content={content}
      onUpdate={(e) => setContent(e.editor.getHTML())}
      renderControls={() => (
        <MenuControlsContainer>
          <MenuSelectHeading />
          <MenuDivider />
          <MenuButtonBold />
          <MenuButtonItalic />
          <MenuButtonUnderline />
          <MenuButtonCode />
          <MenuButtonCodeBlock />
          <MenuButtonBulletedList />
          <MenuButtonTaskList />
        </MenuControlsContainer>
      )}
    />
  );
}
