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

    if (message.action === 'zoom-to-puzzle') {
        const wholePuzzle = document.querySelector(
            '.pz-game-screen'
        ) as HTMLElement;
        if (!wholePuzzle) {
            console.warn('No puzzle found');
            return;
        }

        const navBar = document.querySelector('.pz-nav') as HTMLElement;
        const editotialContent = document.querySelector(
            '#portal-editorial-content'
        ) as HTMLElement;

        if (wholePuzzle.style.transform) {
            wholePuzzle.style.transform = '';
            navBar.style.visibility = 'visible';
            editotialContent.style.visibility = 'visible';
        } else {
            navBar.style.visibility = 'hidden';
            editotialContent.style.visibility = 'hidden';
            wholePuzzle.style.transition = 'transform 0.3s';
            const scale = window.innerHeight / wholePuzzle.offsetHeight;
            wholePuzzle.style.transform = `scale(${scale})`;
            wholePuzzle.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }
});

function click(button: Element | null) {
    if (button) {
        (button as HTMLElement).click();
    }
}
