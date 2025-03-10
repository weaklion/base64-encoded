import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw } from "lucide-react";

function App() {
  // const [encode, setEncode] = useState("");
  // const [decode, setDecode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const handleEncode = async () => {
    const result = (await invoke("encode_base64", { input })) as string;
    setOutput(result);
  };

  const handleRefresh = () => {
    setOutput("");
    setInput("");
  };

  const handleDecode = async () => {
    const result = (await invoke("decode_base64", {
      encoded: input,
    }).catch((error) => setOutput(error))) as string;

    setOutput(result);
  };

  return (
    <main className="container flex flex-col items-center gap-4 p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Base64 Encoder & Decoder </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter text or Base64 string here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-4"
          />
          <div className="flex gap-2">
            <Button onClick={handleEncode}>Encode</Button>
            <Button onClick={handleDecode} variant="outline">
              Decode
            </Button>
            <Button onClick={handleRefresh} className="ml-auto">
              <RotateCcw />
              Refresh
            </Button>
          </div>
          <Textarea
            placeholder="Output will appear here..."
            value={output}
            readOnly
            className="mt-4"
          />
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
