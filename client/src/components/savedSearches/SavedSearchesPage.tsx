import { styled, Box, Typography, Button, List, ListItem } from "@mui/material";
import Title from "../ui/Title";
import {
  DEFAULT_SAVED_SEARCHES,
  getScrollbarWidth,
  SAVED_SEARCHES_KEY,
} from "../../constants";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import SavedSearchCard from "./SavedSearchCard";
import { useEffect, useState } from "react";
import { SavedSearch } from "../../types";
import CenteredCircularProgress from "../ui/CenteredCircularProgress";

const ContainerWithStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px - ${getScrollbarWidth()}px);
`;

const ParagraphWithStyle = styled(Typography)`
  color: #979797;
  font-size: 14px;
  font-weight: 400;
`;

const TitleWithStyle = styled("h2")`
  font-size: 16px;
  font-weight: 500;
`;

const BottomButtonWithStyle = styled(Button)`
  margin: 20px;
  margin-top: 50px;
`;

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>();

  useEffect(() => {
    chrome.storage.sync.get(SAVED_SEARCHES_KEY, (result) =>
      setSavedSearches(result[SAVED_SEARCHES_KEY] as SavedSearch[])
    );
  }, []);

  return (
    <ContainerWithStyle>
      <Title value="Saved Searches" />
      <ParagraphWithStyle>
        Control which searches Job Jarvis will monitor for new jobs.
      </ParagraphWithStyle>
      <TitleWithStyle>Default Searches</TitleWithStyle>
      <List>
        {DEFAULT_SAVED_SEARCHES.map((search) => (
          <ListItem key={search.name}>
            <SavedSearchCard savedSearch={search} />
          </ListItem>
        ))}
      </List>
      <TitleWithStyle>Saved Searches</TitleWithStyle>
      {savedSearches ? (
        <List>
          {savedSearches
            .filter(
              (search) =>
                !DEFAULT_SAVED_SEARCHES.map((other) => other.name).includes(
                  search.name
                )
            )
            .map((search) => (
              <ListItem key={search.name}>
                <SavedSearchCard savedSearch={search} />
              </ListItem>
            ))}
        </List>
      ) : (
        <CenteredCircularProgress />
      )}
      <Box>
        <Button variant="text">Import Saved Searches from Upwork</Button>
      </Box>
      <BottomButtonWithStyle variant="contained">
        Start all monitoring
      </BottomButtonWithStyle>
    </ContainerWithStyle>
  );
}
