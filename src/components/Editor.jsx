import { Sandpack } from "@codesandbox/sandpack-react";

export default function Editor({ files, activeFile, onFilesChange }) {
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Sandpack
        template="react"
        theme="dark"
        files={files}
        activeFile={activeFile}
        onFilesChange={onFilesChange}  // ← NEW! Captures edits
      />
    </div>
  );
}