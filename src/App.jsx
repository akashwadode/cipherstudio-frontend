import { useState } from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import Editor from "./components/Editor";
import FileExplorer from "./components/FileExplorer";
import { saveProject, loadProject, generateId } from "./services/api";
import "./components/App.css";

function App() {
  const [files, setFiles] = useState({
    active: "/App.js",
    content: {
      "/App.js": `function App() {
  return <h1>Hello CipherStudio! 🎉</h1>;
}
export default App;`,
      "/index.js": `import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    },
  });

  const [projectId, setProjectId] = useState(() => {
    const savedId = localStorage.getItem("currentProjectId");
    if (savedId) return savedId;
    const newId = generateId();
    localStorage.setItem("currentProjectId", newId);
    return newId;
  });

  const handleSandpackChange = (newFiles) => {
    setFiles((prev) => ({
      active: prev.active,
      content: newFiles,
    }));
  };

  const handleSave = async () => {
    try {
      localStorage.setItem("currentProjectId", projectId);
      const result = await saveProject(projectId, files.content);
      alert(`✅ Saved as: ${result.project.projectId}`);
    } catch (error) {
      alert("❌ Save Failed!");
      console.error(error);
    }
  };

  const handleLoad = async () => {
    try {
      const loaded = await loadProject(projectId);
      if (loaded) {
        setFiles({ active: Object.keys(loaded)[0], content: loaded });
        alert(`✅ Loaded project ID: ${projectId}`);
      } else {
        alert("❌ No project found!");
      }
    } catch (error) {
      alert("❌ Load Failed!");
      console.error(error);
    }
  };

  return (
    <SandpackProvider
      template="react"
      files={files.content}
      activeFile={files.active}
      customSetup={{ entry: "/index.js" }}
      onChange={handleSandpackChange}
    >
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "Arial" }}>
        <FileExplorer files={files.content} activeFile={files.active} onFilesChange={handleSandpackChange} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "15px",
            background: "#f5f5f5",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h1 style={{ margin: 0 }}>🧩 CipherStudio</h1>
            <div>
              <button onClick={handleSave} style={{ marginRight: "10px", padding: "8px 16px" }}>💾 Save</button>
              <button onClick={handleLoad} style={{ padding: "8px 16px" }}>📂 Load</button>
              <span style={{ marginLeft: "20px", color: "#666", fontSize: "12px" }}>
                ID: {projectId.slice(-8)}
              </span>
            </div>
          </div>
          <Editor files={files.content} activeFile={files.active} onFilesChange={handleSandpackChange} />
        </div>
      </div>
    </SandpackProvider>
  );
}

export default App;
