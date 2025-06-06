import { Extension, RawCommands } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { IconButton } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import React from "react";

const pluginKey = new PluginKey("aiSnippetHighlight");

function getDecorations(doc: any) {
    const decorations: any[] = [];
    // Flatten the document to a single string and keep track of node positions
    let fullText = '';
    const nodeStarts: { node: any, start: number, end: number, pos: number }[] = [];
    let offset = 0;

    doc.descendants((node: any, pos: number) => {
        if (node.isText) {
            nodeStarts.push({ node, start: offset, end: offset + node.text.length, pos });
            fullText += node.text;
            offset += node.text.length;
        }
    });

    // Find all { ... } blocks in the full text
    const regex = /\{([\s\S]+?)\}/g;
    let match;
    while ((match = regex.exec(fullText)) !== null) {
        const matchStart = match.index;
        const matchEnd = match.index + match[0].length;

        // Find which nodes this match spans
        let startNodeIdx = nodeStarts.findIndex(n => n.start <= matchStart && n.end > matchStart);
        let endNodeIdx = nodeStarts.findIndex(n => n.start < matchEnd && n.end >= matchEnd);
        if (startNodeIdx === -1 || endNodeIdx === -1) continue;

        let startNode = nodeStarts[startNodeIdx];
        let endNode = nodeStarts[endNodeIdx];

        // If the match is within a single node
        if (startNodeIdx === endNodeIdx) {
            decorations.push(
                Decoration.inline(
                    startNode.pos + (matchStart - startNode.start),
                    startNode.pos + (matchEnd - startNode.start),
                    { class: "ai-snippet-highlight" }
                )
            );
        } else {
            // Start decoration in the first node
            decorations.push(
                Decoration.inline(
                    startNode.pos + (matchStart - startNode.start),
                    startNode.pos + (startNode.end - startNode.start),
                    { class: "ai-snippet-highlight" }
                )
            );
            // Middle nodes (if any)
            for (let i = startNodeIdx + 1; i < endNodeIdx; i++) {
                let n = nodeStarts[i];
                decorations.push(
                    Decoration.inline(
                        n.pos,
                        n.pos + (n.end - n.start),
                        { class: "ai-snippet-highlight" }
                    )
                );
            }
            // End decoration in the last node
            decorations.push(
                Decoration.inline(
                    endNode.pos,
                    endNode.pos + (matchEnd - endNode.start),
                    { class: "ai-snippet-highlight" }
                )
            );
        }
    }

    return DecorationSet.create(doc, decorations);
}

export const CustomAISnippet = Extension.create({
    name: "aiSnippet",

    addCommands() {
        return {
            insertAISnippet: () => ({ commands }: { commands: RawCommands }) => {
                return commands.insertContent(
                    '<p>AI-generated snippet: This project uses {highlighted} content inside braces.</p>'
                );
            },
        } as Partial<RawCommands>;
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: pluginKey,
                state: {
                    init: (_: any, { doc }: any) => ({
                        decorations: getDecorations(doc),
                    }),
                    apply(tr: any, prev: any, _oldState: any, newState: any) {
                        if (tr.docChanged) {
                            return { decorations: getDecorations(newState.doc) };
                        }
                        return prev;
                    },
                },
                props: {
                    decorations(state: any) {
                        return this.getState(state).decorations;
                    },
                },
            }),
        ];
    },
});

interface AISnippetMenuButtonProps {
    editor: any;
}

export const AISnippetMenuButton: React.FC<AISnippetMenuButtonProps> = ({ editor }) => {
    if (!editor) return null;

    return (
        <IconButton
            aria-label="Insert AI snippet"
            onClick={() => editor.commands.insertAISnippet()}
            color="primary"
        >
            <AutoFixHighIcon />
        </IconButton>
    );
}; 