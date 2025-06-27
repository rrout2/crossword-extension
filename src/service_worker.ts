chrome.commands.onCommand.addListener(command => {
    switch (command) {
        case 'pencil':
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                const tabId = tabs[0].id;
                if (tabId) {
                    chrome.tabs.sendMessage(tabId, {action: 'click-pencil'});
                }
            });
            break;
        case 'pause':
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                const tabId = tabs[0].id;
                if (tabId) {
                    chrome.tabs.sendMessage(tabId, {action: 'pause-unpause'});
                }
            });
            break;
        case 'zoom-to-puzzle':
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                const tabId = tabs[0].id;
                if (tabId) {
                    chrome.tabs.sendMessage(tabId, {action: 'zoom-to-puzzle'});
                }
            });
            break;
        case 'jump-to-clue':
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                const tabId = tabs[0].id;
                if (tabId) {
                    chrome.tabs.sendMessage(tabId, {action: 'jump-to-clue'});
                }
            });
            break;
    }
});
chrome.commands.getAll().then(huh => console.log(huh));
