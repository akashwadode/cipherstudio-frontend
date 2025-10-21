import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack
} from "@codesandbox/sandpack-react";
import { useEffect, useRef } from "react";

export default function Editor({ onFilesChange }) {
  const { sandpack } = useSandpack();
  const prevFilesRef = useRef(sandpack.files);

  useEffect(() => {
    const current = JSON.stringify(sandpack.files);
    const prev = JSON.stringify(prevFilesRef.current);

    if (current !== prev) {
      prevFilesRef.current = sandpack.files;
      onFilesChange?.(sandpack.files);
    }
  }, [sandpack.files, onFilesChange]);

  return (
    <div className="editor-container">
      <SandpackLayout className="sandpack-layout">
        <SandpackCodeEditor showLineNumbers showInlineErrors />
        <SandpackPreview />
      </SandpackLayout>
    </div>
  );
}