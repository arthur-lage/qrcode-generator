import React from "react";
import '../styles/Code.css'

function Code({ qrCode }) {
  return (
    <div className="qrcode-wrapper">
        <img src={qrCode} alt={"QR Code"} />
        <div className="buttons">
            <a href={qrCode} download="qrcode">Download</a>
        </div>
    </div>
  )
}

export default Code;
