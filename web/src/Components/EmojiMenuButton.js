import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover, IconButton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useState } from "react";

export function EmojiMenuButton({ editor }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        if (!editor) {
            console.warn("Editor instance is not ready");
            return;
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleEmojiSelect = (emoji) => {
        if (!editor) return;
        editor.chain().focus().insertContent(emoji.native).run();
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick} disabled={!editor}>
                <EmojiEmotionsIcon />
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" />
            </Popover>
        </>
    );
}