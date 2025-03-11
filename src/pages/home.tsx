import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

function App() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);

  const handleEncode = async () => {
    if (urlSafe) {
      const result = (await invoke("encode_url_safe", { input })) as string;
      setOutput(result);
    } else {
      const result = (await invoke("encode_base64", { input })) as string;
      setOutput(result);
    }
  };

  const handleRefresh = () => {
    setOutput("");
    setInput("");
  };

  const handleDecode = async () => {
    if (urlSafe) {
      const result = (await invoke("decode_url_safe", {
        encoded: input,
      }).catch((error) => setOutput(error))) as string;
      setOutput(result);
    } else {
      const result = (await invoke("decode_base64", {
        encoded: input,
      }).catch((error) => setOutput(error))) as string;
      setOutput(result);
    }
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
          <div className="flex gap-2 mb-4">
            <Button onClick={handleEncode}>Encode</Button>
            <Button onClick={handleDecode} variant="outline">
              Decode
            </Button>
            <Button onClick={handleRefresh} className="ml-auto">
              <RotateCcw />
              Refresh
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="url-safe"
                checked={urlSafe}
                onCheckedChange={(checked) => setUrlSafe(checked as boolean)}
              />
              <label
                htmlFor="url-safe"
                className="text-sm font-medium leading-none"
              >
                URL-Safe
              </label>
            </div>
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
