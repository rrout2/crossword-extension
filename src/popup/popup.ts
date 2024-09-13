const hotkey = document.getElementById('hotkey');
if (hotkey) {
    hotkey.onclick = () =>
        chrome.tabs.create({
            url: 'chrome://extensions/configureCommands',
        });
}
