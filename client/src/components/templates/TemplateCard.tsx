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
import {
  COLOR_DARK_GREY,
  COLOR_DEEP_BLACK,
  COLOR_LIGHT_GREEN,
} from "../../constants";
import IconCode from "../../assets/icon_code.svg";

interface IProps {
  template?: Template;
  onSelectEdit?: (template: Template) => void;
  onSelectDelete?: (template: Template) => void;
  onSelectAction?: () => void;
  isFakeCardForAdding?: boolean;
  showGenerateButton?: boolean;
}

const TitleWithStyle = styled("h2")`
  font-weight: 600;
  font-size: 16px;
  margin: 0;
`;

const ParagraphWithStyle = styled("p")`
  display: -webkit-box;
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR_DARK_GREY};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardWithStyle = styled(Card)`
  width: 373px;
  height: 163px;
  border-radius: 16px;
  margin: 20px;
  text-align: left;
`;

const ButtonWithStyle = styled(Button)`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
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
    <CardWithStyle
      style={{
        backgroundColor: isFakeCardForAdding ? COLOR_LIGHT_GREEN : undefined,
      }}
    >
      <CardContent style={{ paddingBottom: "0px" }}>
        <TitleWithStyle>
          {isFakeCardForAdding ? "Add a new template" : template!.title}
        </TitleWithStyle>
        <ParagraphWithStyle>
          {isFakeCardForAdding
            ? "Create a new template from the template library or create a new from scratch"
            : template!.description}
        </ParagraphWithStyle>
      </CardContent>
      <CardActions style={{ padding: "0px" }}>
        <Box display="flex" justifyContent="center" width="100%">
          {(showGenerateButton || isFakeCardForAdding) && (
            <ButtonWithStyle
              variant="contained"
              style={{ backgroundColor: COLOR_DEEP_BLACK }}
              onClick={onSelectAction}
              fullWidth
            >
              {!isFakeCardForAdding ? (
                "Generate"
              ) : (
                <>
                  <Add /> <span>&nbsp;</span> Add New Template
                </>
              )}
            </ButtonWithStyle>
          )}
          {!isFakeCardForAdding && (
            <>
              <ButtonWithStyle
                variant="contained"
                color="secondary"
                onClick={() => onSelectEdit!(template!)}
                fullWidth
              >
                <img src={IconCode} alt="Code Icon" />
              </ButtonWithStyle>
              <ButtonWithStyle
                color="error"
                variant="contained"
                onClick={() => onSelectDelete!(template!)}
                fullWidth
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
