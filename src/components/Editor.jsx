import { SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";

export default function Editor() {
  return (
    <div className="editor-container">
      <SandpackLayout className="sandpack-layout">
        <SandpackCodeEditor showLineNumbers showInlineErrors />
        <SandpackPreview />
      </SandpackLayout>
    </div>
  );
}
