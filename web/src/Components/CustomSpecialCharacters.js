import { Extension } from "@tiptap/core";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import { useState } from "react";

export const CustomSpecialCharacters = Extension.create({
    name: "specialCharacters",

    addCommands() {
        return {
            insertSpecialCharacter:
                (character) =>
                    ({ commands }) => {
                        return commands.insertContent(character);
                    },
        };
    },
});

export const SpecialCharactersMenuButton = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const specialCharacters = [
        { label: "Smiley (😊)", value: "😊" }, // Emoji
        { label: "Right Arrow (→)", value: "→" }, // Arrow
        { label: "Left Arrow (←)", value: "←" }, // Arrow
        { label: "Dollar ($)", value: "$" }, // Currency
        { label: "Euro (€)", value: "€" }, // Currency
        { label: "Trademark (™)", value: "™" }, // Trademark
        { label: "Copyright (©)", value: "©" }, // Trademark
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (character) => {
        if (editor) {
            editor.commands.insertSpecialCharacter(character);
        }
        handleClose();
    };

    return (
        <>
            <IconButton
                aria-label="Insert special character"
                onClick={handleClick}
                disabled={!editor?.can().insertContent()}
            >
                <FormatShapesIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {specialCharacters.map((char) => (
                    <MenuItem key={char.value} onClick={() => handleSelect(char.value)}>
                        {char.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};