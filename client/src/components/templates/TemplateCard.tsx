import { Add, Code, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  styled,
} from "@mui/material";
import type { Template } from "../../types";

interface IProps {
  template?: Template;
  onSelectEdit?: (template: Template) => void;
  onSelectDelete?: (template: Template) => void;
  onSelectAction?: () => void;
  isFakeCardForAdding?: boolean;
  showGenerateButton?: boolean;
}

const CardWithStyle = styled(Card)`
  width: 375px;
  height: 250px;
  margin: 20px;
`;

const ButtonWithStyle = styled(Button)`
  margin: 20px;
`;

export default function TemplateCard({
  template,
  isFakeCardForAdding,
  showGenerateButton,
  onSelectEdit,
  onSelectDelete,
  onSelectAction,
}: IProps) {
  if (!isFakeCardForAdding) {
    if (!template || !onSelectEdit || !onSelectDelete) {
      throw new Error(
        "Template and edit and delete actions are required for non-fake cards"
      );
    }
  }

  if (showGenerateButton || isFakeCardForAdding) {
    if (!onSelectAction) {
      throw new Error("Action is required for generation or fake cards");
    }
  }

  return (
    <CardWithStyle>
      <CardContent>
        <h2>{isFakeCardForAdding ? "Add a new template" : template!.title}</h2>
        <p>
          {isFakeCardForAdding
            ? "Create a new template from the template library or create a new from scratch"
            : template!.description}
        </p>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="center" width="100%">
          {(showGenerateButton || isFakeCardForAdding) && (
            <ButtonWithStyle
              variant="contained"
              color="success"
              onClick={onSelectAction}
            >
              {!isFakeCardForAdding ? (
                "Generate"
              ) : (
                <>
                  <Add /> <span>&nbsp;</span> Add Template
                </>
              )}
            </ButtonWithStyle>
          )}
          {!isFakeCardForAdding && (
            <>
              <ButtonWithStyle
                variant="contained"
                color="primary"
                onClick={() => onSelectEdit!(template!)}
              >
                <Code />
              </ButtonWithStyle>
              <ButtonWithStyle
                color="error"
                variant="contained"
                onClick={() => onSelectDelete!(template!)}
              >
                <Delete />
              </ButtonWithStyle>
            </>
          )}
        </Box>
      </CardActions>
    </CardWithStyle>
  );
}
