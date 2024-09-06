const huh = chrome.commands.onCommand.addListener((command) => {
  if (command === "pencil") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "click-pencil"});
    });
  }
  if (command === "pause") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "pause-unpause"});
    });
  }
});
chrome.commands.getAll().then(huh => console.log(huh));
