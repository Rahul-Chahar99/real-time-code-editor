import "./App/App.css";
import { Editor } from "@monaco-editor/react";
import { useRef, useMemo } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { MonacoBinding } from "y-monaco";

function App() {
  const editorRef = useRef(null);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;
    const provider = new SocketIOProvider(
      import.meta.env.VITE_BACKEND_URL ,
      "monaco",
      ydoc,
      { autoConnect: true },
    );
    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness,
    );
  };

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-4">
      <aside className="h-full w-1/5 bg-amber-50 rounded-lg"></aside>
      <section className="w-4/5 h-full bg-neutral-800 rounded-lg overflow-auto ">
        <Editor
          theme="vs-dark"
          height="100%"
          defaultLanguage="javascript"
          defaultValue="//some comment"
          onMount={handleMount}
        />
      </section>
    </main>
  );
}

export default App;
