// This is the File where we can run background jobs
// if we have to do some initial things

let color = "red";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    color,
  });
});
