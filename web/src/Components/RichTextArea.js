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
import { FavouriteMenuButton, CustomFavourite } from "./CustomFavourite";

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
                CustomFavourite, // Handles Favourite
                ...extensions, // Include parent-provided extensions (e.g., configured CustomFavourite)
            ]}
            content={content}
            onUpdate={(e) => setContent(e.editor.getHTML())}
            renderControls={() => (
                <MenuControlsContainer>
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    <MenuDivider />
                    <MenuButtonBulletedList />
                    <MenuButtonOrderedList />
                    <MenuButtonBlockquote />
                    <MenuDivider />
                    <SpecialCharactersMenuButton />
                    <AISnippetMenuButton />
                    <FavouriteMenuButton />
                </MenuControlsContainer>
            )}
        />
    );
}