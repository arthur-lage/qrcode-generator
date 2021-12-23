import React, { useState } from "react";
import axios from "axios";

import "./styles/App.css";

import Code from "./components/Code";

function App() {
  const [inputText, setInputText] = useState("");
  const [qrCode, setQRCode] = useState("");

  const url = "http://localhost:3001/gen";

  const genQRCode = async () => {
    if (inputText.length === 0) {
      return;
    }

    const params = {
      url: inputText,
    };

    await axios
      .post(url, params)
      .then((res) => {
        setQRCode(res.data);
      })
      .catch((e) => {
        e && alert("deu erro");
      });
  };

  return (
    <div className="App">
      <main>
        <div className="title">
          <h1>QR Code Generator</h1>
        </div>
        <section className="input-field">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            placeholder="Type your text, URL here..."
          />
          <button onClick={genQRCode}>Generate</button>
        </section>

        <section className="qrcode-section">
          {qrCode ? (
            <div className="">
              <Code qrCode={qrCode} />
            </div>
          ) : (
            <h2>No QR Codes were generated yet</h2>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
