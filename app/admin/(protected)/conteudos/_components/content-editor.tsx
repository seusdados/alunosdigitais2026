"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import type { RefObject } from "react";

import { getContentEditorExtensions } from "@/lib/editor/extensions";
import { cn } from "@/lib/utils";

export type EditorHandle = {
  getJSON: () => unknown;
  getHTML: () => string;
  getText: () => string;
  focus: () => void;
};

type Props = {
  initialContent?: unknown;
  placeholder?: string;
  onChange?: (payload: { json: unknown; html: string; text: string }) => void;
  editorRef?: RefObject<EditorHandle | null>;
};

export function ContentEditor({ initialContent, placeholder, onChange, editorRef }: Props) {
  const editor = useEditor({
    extensions: getContentEditorExtensions(placeholder),
    content: (initialContent as object | undefined) ?? "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[320px] rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      },
    },
    onUpdate({ editor }) {
      onChange?.({ json: editor.getJSON(), html: editor.getHTML(), text: editor.getText() });
    },
  });

  // Expose imperative handle via the ref prop (no forwardRef needed in React 19).
  const editorLive = useRef<Editor | null>(null);
  editorLive.current = editor ?? null;

  useImperativeHandle(
    editorRef as unknown as RefObject<EditorHandle | null>,
    () => ({
      getJSON: () => editorLive.current?.getJSON() ?? { type: "doc", content: [] },
      getHTML: () => editorLive.current?.getHTML() ?? "",
      getText: () => editorLive.current?.getText() ?? "",
      focus: () => {
        editorLive.current?.commands.focus();
      },
    }),
    [],
  );

  // Emit the initial state once so the parent form has something to save
  // even if the user never types.
  useEffect(() => {
    if (!editor) return;
    onChange?.({ json: editor.getJSON(), html: editor.getHTML(), text: editor.getText() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const handleLink = useCallback(() => {
    if (!editor) return;
    const existing = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL do link", existing ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="h-80 animate-pulse rounded-md border border-dashed bg-muted/20" aria-hidden />
    );
  }

  return (
    <div className="space-y-2">
      <Toolbar editor={editor} onLink={handleLink} />
      <EditorContent editor={editor} />
    </div>
  );
}

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
};

function ToolbarButton({ active, disabled, onClick, label, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors",
        active
          ? "border-foreground/40 bg-accent text-accent-foreground"
          : "border-transparent hover:bg-accent hover:text-accent-foreground",
        "disabled:cursor-not-allowed disabled:opacity-40",
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, onLink }: { editor: Editor; onLink: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-md border bg-muted/30 p-1">
      <ToolbarButton
        label="Negrito"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Itálico"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Tachado"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" aria-hidden />

      <ToolbarButton
        label="Título H2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Título H3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" aria-hidden />

      <ToolbarButton
        label="Lista"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Lista ordenada"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Citação"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" aria-hidden />

      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={onLink}>
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" aria-hidden />

      <ToolbarButton
        label="Desfazer"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Refazer"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}
