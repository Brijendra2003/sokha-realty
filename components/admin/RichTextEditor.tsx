"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full rounded-sm border border-ivory-300 animate-pulse bg-ivory-50" />
  ),
});

const MODULES = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "blockquote"],
    ["clean"],
  ],
};

const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "blockquote",
];

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [showSource, setShowSource] = useState(false);

  return (
    <div className="rich-text-editor">
      {/* Toggle button */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={() => setShowSource((s) => !s)}
          className="text-xs font-mono px-3 py-1 rounded border border-ivory-300 
                     dark:border-charcoal-600 text-charcoal-500 dark:text-charcoal-300 
                     hover:border-gold-400 hover:text-gold-500 transition-colors"
        >
          {showSource ? "◀ Back to Editor" : "</> Paste HTML"}
        </button>
      </div>

      {showSource ? (
        /* Raw HTML textarea — paste blog HTML here */
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={20}
          placeholder="Paste your HTML content here, then click '◀ Back to Editor' to see it rendered..."
          className="w-full p-4 font-mono text-xs rounded-sm border border-ivory-300 
                     dark:border-charcoal-600 bg-charcoal-900 text-green-400 
                     focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
        />
      ) : (
        /* Visual rich text editor */
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={MODULES}
          formats={FORMATS}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
