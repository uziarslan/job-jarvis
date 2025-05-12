import { Box, Button, styled, TextField, Typography } from "@mui/material";
import type { Template } from "../../types";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { useState } from "react";

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
        placeholder="Title"
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
        placeholder="Description"
        rows={3}
        onChange={(e) =>
          setEditingTemplate({
            ...editingTemplate,
            description: e.target.value,
          })
        }
      />
      <TypographyWithStyle>Content</TypographyWithStyle>
      <TextField
        multiline
        fullWidth
        value={editingTemplate.content}
        placeholder="Content"
        rows={6}
        onChange={(e) =>
          setEditingTemplate({
            ...editingTemplate,
            content: e.target.value,
          })
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
