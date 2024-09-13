chrome.runtime.onMessage.addListener(message => {
    if (message.action === 'click-pencil') {
        const crosswordsButton = document.querySelector(
            '#portal-game-toolbar > div > ul > li:nth-child(5) > button > i'
        );
        click(crosswordsButton);
    }
    if (message.action === 'pause-unpause') {
        const pauseButton = document.querySelector(
            '#portal-game-toolbar > div > ul > li.xwd__tool--button.xwd__timer--button > button > i'
        );
        const continueButton = document.querySelector(
            '#portal-game-modals > div > div > div.xwd__modal--body.animate-opening > article > div.xwd__modal--button-container > button'
        );
        if (pauseButton) {
            click(pauseButton);
        } else if (continueButton) {
            click(continueButton);
        }
    }
});

function click(button: Element | null) {
    if (button) {
        (button as HTMLElement).click();
    }
}
