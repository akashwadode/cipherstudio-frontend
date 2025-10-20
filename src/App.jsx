import { useState } from "react";
import Editor from "./components/Editor";
import FileManager from "./components/FileManager";
import { saveProject, loadProject, generateId } from "./services/api";

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
  const [projectId, setProjectId] = useState(generateId());

  // 🔥 FIXED: Force Sandpack to switch by changing files object
  const handleFileChange = (file) => {
    setFiles(prev => ({
      active: file,
      content: { ...prev.content }  // ← NEW OBJECT = Sandpack switches!
    }));
  };

  // 🔥 FIXED: Capture edits from Sandpack
  const handleSandpackChange = (files) => {
    setFiles(prev => ({
      active: prev.active,
      content: files
    }));
  };

  const handleSave = () => {
    const result = saveProject(projectId, files.content);
    alert(`✅ Saved as: ${result.projectId}`);
  };

  const handleLoad = () => {
    const loaded = loadProject(projectId);
    if (loaded) {
      setFiles({ active: "/App.js", content: loaded });
      alert("✅ Loaded project!");
    } else {
      alert("❌ No project found!");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      <FileManager files={files} onFileChange={handleFileChange} />
      <div style={{ flex: 1, padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ margin: "0 0 10px 0" }}>🧩 CipherStudio</h1>
          <div>
            <button onClick={handleSave} style={{ marginRight: "10px" }}>
              💾 Save Project
            </button>
            <button onClick={handleLoad}>📂 Load Project</button>
            <span style={{ marginLeft: "20px", color: "#666" }}>
              ID: {projectId}
            </span>
          </div>
        </div>
        <Editor 
          files={files.content} 
          activeFile={files.active}
          onFilesChange={handleSandpackChange}  // ← NEW!
        />
      </div>
    </div>
  );
}

export default App;