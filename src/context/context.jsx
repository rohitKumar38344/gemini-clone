import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

export function ContextProvider(props) {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");
  const [loading, setLoading] = useState(false);

  function delayPara(nextWord, index) {
    setTimeout(() => {
      setResultData((prevWord) => prevWord + nextWord);
    }, 75 * index);
  }

  function newChat() {
    setLoading(false);
    setShowResult(false);
  }

  async function onSent(prompt) {
    console.log(input);
    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);
      if (input === "") {
        setRecentPrompt(prompt);
      } else {
        setRecentPrompt(input);
        setPrevPrompts((prevPrompts) => [...prevPrompts, input]);
      }
      const response = await run(prompt);
      let responseArr = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArr.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArr[i];
        } else {
          newResponse += "<b>" + responseArr[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      setResultData(newResponse2);
      let wordsArr = newResponse2.split(" ");
      for (let i = 0; i < wordsArr.length; i++) {
        delayPara(wordsArr[i] + " ", i);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  const contextValue = {
    input,
    setInput,
    onSent,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    loading,
    resultData,
    showResult,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
}
