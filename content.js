chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "click-pencil") {
    var crosswordsButton = document.querySelector("#portal-game-toolbar > div > ul > li:nth-child(5) > button > i");
    crosswordsButton.click();
  }
  if (message.action === "pause-unpause") {
    var pauseButton = document.querySelector("#portal-game-toolbar > div > ul > li.xwd__tool--button.xwd__timer--button > button > i");
    var continueButton = document.querySelector("#portal-game-modals > div > div > div.xwd__modal--body.animate-opening > article > div.xwd__modal--button-container > button");
    if (!!pauseButton) {
      pauseButton.click();
    } else if (!!continueButton) {
      continueButton.click();
    }
  }
});

