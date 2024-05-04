import { useState } from "react";
import FontBox from "./components/FontCombo";
interface FontType {
  id: string;
  family: string;
}

const App = () => {
  const [selected, setSelected] = useState<FontType>({
    id: "3-Abel",
    family: "Abel",
  });
  const handleChangeFont = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      args: [selected],
      func: (selected) => {
        document.body.style.fontFamily = selected.family;
      },
    });
  };
  return (
    <div className="flex items-center flex-col pt-5 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 min-h-[400px] w-[300px]">
      <h1 className="font-bold text-lg ">Select font to apply</h1>
      <FontBox selected={selected} setSelected={setSelected} />
      <button
        onClick={handleChangeFont}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default App;
