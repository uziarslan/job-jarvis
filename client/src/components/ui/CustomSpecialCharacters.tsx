import { Extension, RawCommands } from "@tiptap/core";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import React, { useState } from "react";

export const CustomSpecialCharacters = Extension.create({
    name: "specialCharacters",

    addCommands() {
        return {
            insertSpecialCharacter: (character: string) => ({ commands }: { commands: RawCommands }) => {
                return commands.insertContent(character);
            },
        } as Partial<RawCommands>;
    },
});

interface SpecialCharactersMenuButtonProps {
    editor: any;
}

export const SpecialCharactersMenuButton: React.FC<SpecialCharactersMenuButtonProps> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const specialCharacters = [
        { label: "Smiley (😊)", value: "😊" },
        { label: "Right Arrow (→)", value: "→" },
        { label: "Left Arrow (←)", value: "←" },
        { label: "Dollar ($)", value: "$" },
        { label: "Euro (€)", value: "€" },
        { label: "Trademark (™)", value: "™" },
        { label: "Copyright (©)", value: "©" },
    ];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (character: string) => {
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