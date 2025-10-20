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
root.render(<App />);`
    }
  });

  const [projectId, setProjectId] = useState(() => {
    const savedId = localStorage.getItem("currentProjectId");
    if (savedId) return savedId;
    const newId = generateId();
    localStorage.setItem("currentProjectId", newId);
    return newId;
  });

  const handleSandpackChange = (newFiles) => {
    console.log("Files changed:", newFiles);
    setFiles(prev => ({
      ...prev,
      content: newFiles
    }));
  };

  const handleSave = () => {
    localStorage.setItem("currentProjectId", projectId);
    const result = saveProject(projectId, files.content);
    alert(`✅ Saved as: ${result.projectId}`);
  };

  const handleLoad = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("project_"));
    if (keys.length === 0) return alert("❌ No project found!");
    const firstProjectId = keys[0].replace("project_", "");
    const loaded = loadProject(firstProjectId);
    setProjectId(firstProjectId);
    setFiles({ active: Object.keys(loaded)[0], content: loaded });
    alert(`✅ Loaded project ID: ${firstProjectId}`);
  };

  return (
    <SandpackProvider
      template="react"
      files={files.content}
      activeFile={files.active}
      customSetup={{ entry: "/index.js" }}
      onChange={handleSandpackChange}
    >
      <div className="app-container">
        <FileExplorer />
        <div className="main-content">
          <div className="topbar">
            <h1>🧩 CipherStudio</h1>
            <div className="controls">
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={handleLoad}>📂 Load</button>
              <span className="project-id">ID: {projectId.slice(-8)}</span>
            </div>
          </div>
          <Editor onFilesChange={handleSandpackChange} />
        </div>
      </div>
    </SandpackProvider>
  );
}

export default App;
