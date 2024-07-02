import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/context";

export function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  async function loadPrompt(prompt) {
    // setRecentPrompt(prompt);
    await onSent(prompt);
  }
  return (
    <div className={`sidebar ${extended ? "open" : ""}`}>
      <div className="top">
        <div onClick={() => setExtended(!extended)}>
          <img src={assets.menu_icon} alt="" />
        </div>
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="" />
          {extended && <span>New Chat</span>}
        </div>
      </div>
      <div className={`recent ${extended ? "" : "hide"}`}>
        <p className="recent-title">Recent</p>
        {prevPrompts &&
          prevPrompts.map((prompt, index) => {
            return (
              <div
                className="recent-entry"
                key={index}
                onClick={() => loadPrompt(prompt)}
              >
                <img src={assets.message_icon} alt="" />
                <p>{prompt.slice(0, 18) + "..."}</p>
              </div>
            );
          })}
      </div>
      <div className="sidebar-bottom">
        <div>
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div>
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div>
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}
