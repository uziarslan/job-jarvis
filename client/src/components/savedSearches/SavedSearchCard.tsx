import { Box } from "@mui/material";
import { SavedSearch } from "../../types";

interface IProps {
  savedSearch: SavedSearch;
}

export default function SavedSearchCard({ savedSearch }: IProps) {
  return (
    <>
      <Box>
        <h3>{savedSearch.name}</h3>
      </Box>
      <Box></Box>
    </>
  );
}
