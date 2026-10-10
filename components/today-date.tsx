"use client";

import { useEffect, useState } from "react";

// shows today's date in bangla
// (set inside useEffect so the server and browser text match)
export default function TodayDate() {
  const [text, setText] = useState("");

  useEffect(() => {
    const d = new Date();
    setText(
      d.toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return <span>{text || "\u00A0"}</span>;
}
