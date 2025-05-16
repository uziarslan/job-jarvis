import { Box, Button, styled, TextField, Typography } from "@mui/material";
import type { Template } from "../../types";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { useState } from "react";
import RichTextArea from "../ui/forms/RichTextArea";

interface IProps {
  template: Template;
  onClickBack: () => void;
  onClickSave: (template: Template) => void;
}

const BoxWithStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50%;
  position: relative;
  text-align: left;
  left: -${SIDEBAR_WIDTH_PX}px;
`;

const TypographyWithStyle = styled(Typography)`
  margin-top: 50px;
  margin-bottom: 15px;
  font-size: 1rem;
  font-weight: bold;
`;

const ButtonWithStyle = styled(Button)`
  margin: 20px;
`;

export default function TemplateCardEdit({
  template,
  onClickBack,
  onClickSave,
}: IProps) {
  const [editingTemplate, setEditingTemplate] = useState(template);

  return (
    <BoxWithStyle>
      <TypographyWithStyle>Title</TypographyWithStyle>
      <TextField
        fullWidth
        value={editingTemplate.title}
        onChange={(e) =>
          setEditingTemplate({
            ...editingTemplate,
            title: e.target.value,
          })
        }
      />
      <TypographyWithStyle>Description</TypographyWithStyle>
      <TextField
        multiline
        fullWidth
        value={editingTemplate.description}
        rows={3}
        onChange={(e) =>
          setEditingTemplate({
            ...editingTemplate,
            description: e.target.value,
          })
        }
      />
      <TypographyWithStyle>Content</TypographyWithStyle>
      <RichTextArea
        content={editingTemplate.content}
        setContent={(content) =>
          setEditingTemplate({ ...editingTemplate, content })
        }
      />
      <Box display="flex" justifyContent="center" marginTop={2}>
        <ButtonWithStyle
          variant="contained"
          color="secondary"
          onClick={onClickBack}
        >
          Back
        </ButtonWithStyle>
        <ButtonWithStyle
          variant="contained"
          color="primary"
          onClick={() => onClickSave(editingTemplate)}
        >
          Save
        </ButtonWithStyle>
      </Box>
    </BoxWithStyle>
  );
}
