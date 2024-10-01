import { useState, useEffect } from "react";

import "./Global.css";
import Style from "./Style.module.css";

const App = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -500, y: 0 });
  let classButton = `${Style.button} ${enabled ? Style.disable : Style.enable}`;

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({
        x: clientX,
        y: clientY,
      });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  useEffect(() => {
    document.body.classList.toggle("withoutCursor", enabled);

    return () => {
      document.body.classList.remove("withoutCursor");
    };
  }, [enabled]);

  return (
    <main className={Style.main}>
      <div
        className={Style.cursor}
        style={{
          transform: `translate(${position.x}px,${position.y}px)`,
          display: enabled ? "block" : "none",
        }}
      />
      <button className={classButton} onClick={() => setEnabled(!enabled)}>
        {enabled ? "Disable" : "Enable"} Button
      </button>
      <aside className={Style.message}>
        This content only is available in a Pc
      </aside>
    </main>
  );
};

export default App;
