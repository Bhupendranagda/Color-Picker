const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

btn.addEventListener("click", async () => {
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("color", color);
  });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // PLease give permission in manifest file that scripting is allowed

  //   This is if we have to inject some script to a tab
  //   Below funciton accespts two arguments second one receives the result of first
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectionResult) => {
      const [data] = injectionResult;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (err) {
          console.log(err);
        }
      }
    }
  );
});

// This process or function is differnet from above
// process or fucntion
// Because it runs on webpage you are currently on
// While above works on the extension
async function pickColor() {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    console.log(selectedColor);
  } catch (err) {
    console.log(err);
  }
}
