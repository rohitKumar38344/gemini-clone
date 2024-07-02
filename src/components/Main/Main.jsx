import { useContext } from "react";
import { assets } from "../../assets/assets";
import { Card } from "./Card";
import "./Main.css";
import { Context } from "../../context/context";

export function Main() {
  const {
    input,
    setInput,
    onSent,
    recentPrompt,
    loading,
    resultData,
    showResult,
  } = useContext(Context);

  return (
    <main className="main">
      <nav className="title">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </nav>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <Card imageUrl={assets.compass_icon}>
                Suggest beautiful places to see on an upcoming road trip
              </Card>
              <Card imageUrl={assets.bulb_icon}>
                Suggest beautiful places to see on an upcoming road trip
              </Card>
              <Card imageUrl={assets.message_icon}>
                Suggest beautiful places to see on an upcoming road trip
              </Card>
              <Card imageUrl={assets.code_icon}>
                Suggest beautiful places to see on an upcoming road trip
              </Card>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              name="query"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="options">
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && (
                <img
                  src={assets.send_icon}
                  alt=""
                  onClick={() => onSent(input)}
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </main>
  );
}
