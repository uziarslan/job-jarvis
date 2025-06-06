import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuButtonBulletedList,
    MenuButtonOrderedList,
    MenuButtonBlockquote,
    MenuControlsContainer,
    MenuDivider,
    RichTextEditor,
} from "mui-tiptap";
import StarterKit from "@tiptap/starter-kit";
import { SpecialCharactersMenuButton, CustomSpecialCharacters } from "./CustomSpecialCharacters";
import { AISnippetMenuButton, CustomAISnippet } from "./CustomAISnippet";
import { EmojiMenuButton } from "./EmojiMenuButton";

export default function RichTextArea({
    content,
    setContent,
    height = 200,
    extensions = [], // Allow extensions to be passed from parent
}) {
    return (
        <RichTextEditor
            height={height}
            extensions={[
                StarterKit, // Includes Bold, Italic, Bullet, Numbers (Ordered List), Quote
                CustomSpecialCharacters, // Handles Emoji, Arrow, Currency, Trademark
                CustomAISnippet, // Handles AI Snippet
                ...extensions, // Include parent-provided extensions (e.g., configured CustomFavourite)
            ]}
            content={content}
            onUpdate={(e) => setContent(e.editor.getHTML())}
            renderControls={(editor) => (
                <MenuControlsContainer>
                    <EmojiMenuButton editor={editor} />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    <MenuDivider />
                    <MenuButtonBulletedList />
                    <MenuButtonOrderedList />
                    <MenuButtonBlockquote />
                    <MenuDivider />
                    <SpecialCharactersMenuButton editor={editor} />
                    <AISnippetMenuButton editor={editor} />
                </MenuControlsContainer>
            )}
        />
    );
}