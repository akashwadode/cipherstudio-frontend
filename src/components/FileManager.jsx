export default function FileManager({ files, onFileChange }) {
  const defaultFiles = {
    "/App.js": `function App() {
  return <h1>Hello CipherStudio! 🎉</h1>;
}
export default App;`,
    "/index.js": `import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  };

 const handleFileClick = (file) => {
  onFileChange(file);  // ← PERFECT!
};

  return (
    <div style={{ 
      width: "200px", 
      background: "#1e1e1e", 
      color: "white", 
      padding: "10px" 
    }}>
      <h3 style={{ margin: "0 0 10px 0" }}>📁 Files</h3>
      {Object.keys(defaultFiles).map((file) => (
        <div
          key={file}
          onClick={() => handleFileClick(file)}
          style={{
            padding: "5px",
            cursor: "pointer",
            background: files.active === file ? "#007acc" : "transparent"
          }}
        >
          {file}
        </div>
      ))}
    </div>
  );
}