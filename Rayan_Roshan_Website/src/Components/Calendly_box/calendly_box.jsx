import React, { useEffect } from "react";

export default function CalendlyBox() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/2006rayanroshan/meeting-with-rayan-1-on-1?hide_event_type_details=1&hide_gdpr_block=1"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
