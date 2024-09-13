chrome.commands.onCommand.addListener(command => {
    if (command === 'pencil') {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            const tabId = tabs[0].id;
            if (tabId) {
                chrome.tabs.sendMessage(tabId, {action: 'click-pencil'});
            }
        });
    }
    if (command === 'pause') {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            const tabId = tabs[0].id;
            if (tabId) {
                chrome.tabs.sendMessage(tabId, {action: 'pause-unpause'});
            }
        });
    }
});
chrome.commands.getAll().then(huh => console.log(huh));
