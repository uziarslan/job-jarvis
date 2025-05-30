import { Extension } from "@tiptap/core";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const CustomFavourite = Extension.create({
    name: "favourite",

    addOptions() {
        return {
            isFavourite: false,
            setIsFavourite: () => { },
        };
    },
});

export const FavouriteMenuButton = ({ editor }) => {
    // Fallback to default values if editor or editor.options is undefined
    const { isFavourite = false, setIsFavourite = () => { } } = editor?.options || {};

    const handleClick = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <IconButton
            aria-label="Toggle favourite"
            onClick={handleClick}
            disabled={!editor?.can().insertContent()}
        >
            <FavoriteIcon color={isFavourite ? "error" : "inherit"} />
        </IconButton>
    );
};