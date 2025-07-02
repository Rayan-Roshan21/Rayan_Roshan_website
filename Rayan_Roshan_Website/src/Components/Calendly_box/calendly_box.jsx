// src/components/Calendly30MinChat.jsx

import React from "react";
import { InlineWidget } from "react-calendly";

export default function CalendlyBox() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <InlineWidget 
        url="https://calendly.com/2006rayanroshan/meeting-with-rayan" 
        styles={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
