import { Popover, IconButton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface EmojiMenuButtonProps {
    editor: any;
}

export const EmojiMenuButton: React.FC<EmojiMenuButtonProps> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!editor) {
            console.warn("Editor instance is not ready");
            return;
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleEmojiSelect = (emojiData: EmojiClickData) => {
        if (!editor) return;
        editor.chain().focus().insertContent(emojiData.emoji).run();
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
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </Popover>
        </>
    );
}; 