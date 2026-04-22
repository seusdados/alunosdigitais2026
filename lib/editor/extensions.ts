import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

export function getContentEditorExtensions(placeholder?: string) {
  return [
    StarterKit.configure({
      heading: { levels: [2, 3, 4] },
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
    }),
    Image.configure({ inline: false, allowBase64: false }),
    Placeholder.configure({
      placeholder: placeholder ?? "Comece a escrever…",
    }),
  ];
}
