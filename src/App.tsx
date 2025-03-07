import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./assets/base.css";

function App() {
  const [encode, setEncode] = useState("");
  const [decode, setDecode] = useState("");
  const [input, setInput] = useState("");

  const handleEncode = async () => {
    const result = (await invoke("encode_base64", { input })) as string;
    setEncode(result);
  };

  const handleDecode = async () => {
    const result = (await invoke("decode_base64", { encode }).catch((error) =>
      alert(error)
    )) as string;
    setDecode(result);
  };

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row bg-black">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <input
        id="greet-input"
        onChange={(e) => setInput(e.currentTarget.value)}
        placeholder="Enter a input..."
      />
      <button onClick={handleDecode}>Decode</button>
      <button onClick={handleEncode}>Encode</button>

      <p>{input}</p>
      <p>{encode}</p>
      <p>{decode}</p>
    </main>
  );
}

export default App;
