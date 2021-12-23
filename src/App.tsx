import React, { useState } from "react";
import axios from "axios";

import toast, { Toaster } from 'react-hot-toast'

import "./styles/App.css";

import Code from "./components/Code";

function App() {
  const [inputText, setInputText] = useState("");
  const [qrCode, setQRCode] = useState("");

  const url = "https://qrcode-generator-server.vercel.app/api/gen";

  const genQRCode = async () => {
    if (inputText.length === 0) {
      toast.error("You need at least 1 character!", {
        style: {
          fontSize: "1.6rem",
          fontFamily: "Poppins, sans-serif"
        }
      })
      return;
    }

    const params = {
      url: inputText,
    };

    await axios
      .post(url, params)
      .then((res) => {
        setQRCode(res.data);
        toast.success("QR Code successfully generated!", {
          style: {
            fontSize: "1.6rem",
            fontFamily: "Poppins, sans-serif"
          }
        })
      })
      .catch((e) => {
        e && toast.error("Couldn't generate QR Code", {
          style: {
            fontSize: "1.6rem",
            fontFamily: "Poppins, sans-serif"
          }
        })
      });
  };

  return (
    <div className="App">
      <Toaster />
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
