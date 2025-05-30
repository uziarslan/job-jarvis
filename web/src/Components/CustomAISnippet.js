import { Extension } from "@tiptap/core";
import { IconButton } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export const CustomAISnippet = Extension.create({
    name: "aiSnippet",

    addCommands() {
        return {
            insertAISnippet:
                () =>
                    ({ commands }) => {
                        const snippet = "<p>AI-generated snippet: This project leverages cutting-edge technology to deliver a robust solution.</p>";
                        return commands.insertContent(snippet);
                    },
        };
    },
});

export const AISnippetMenuButton = ({ editor }) => {
    const handleClick = () => {
        if (editor) {
            editor.commands.insertAISnippet();
        }
    };

    return (
        <IconButton
            aria-label="Insert AI snippet"
            onClick={handleClick}
            disabled={!editor?.can().insertContent()}
        >
            <AutoFixHighIcon />
        </IconButton>
    );
};