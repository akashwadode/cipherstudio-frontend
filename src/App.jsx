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
  return <h1>Hello Ciph erStudio! 🎉</h1>;
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

  const [theme, setTheme] = useState("dark");

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <SandpackProvider
      template="react"
      files={files.content}
      activeFile={files.active}
      customSetup={{ entry: "/index.js" }}
      theme={theme}
      onChange={handleSandpackChange}
    >
      <div className={`app-container ${theme}`}>
        {/* Topbar */}
        <div className="topbar">
          <h1>🧩 CipherStudio</h1>
          <div className="controls">
            <button onClick={handleSave}>💾 Save</button>
            <button onClick={handleLoad}>📂 Load</button>
            <button onClick={toggleTheme}>
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
            <span className="project-id">ID: {projectId.slice(-8)}</span>
          </div>
        </div>

        {/* Workspace: File Explorer Left, Editor Right */}
        <div className="workspace">
          <FileExplorer
            files={files.content}
            activeFile={files.active}
            onFilesChange={handleSandpackChange}
            theme={theme}
          />
          <Editor
            files={files.content}
            activeFile={files.active}
            onFilesChange={handleSandpackChange}
          />
        </div>
      </div>
    </SandpackProvider>
  );
}

export default App;
