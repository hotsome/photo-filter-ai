
import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("ようこそ！ピンボケ判定AIへ");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{message}</h1>
    </div>
  );
}
