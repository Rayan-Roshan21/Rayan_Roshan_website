// src/components/Calendly30MinChat.jsx

import React from "react";
import { InlineWidget } from "react-calendly";

export default function CalendlyBox() {
  return (
    <div style={{ width: "100%" }}>
      <InlineWidget 
        url="https://calendly.com/2006rayanroshan/meeting-with-rayan-1-on-1" 
        styles={{ height: "700px", width: "100%", minWidth: "320px" }}
      />
    </div>
  );
}
