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
            'article > div.xwd__modal--button-container > button'
        );
        if (pauseButton) {
            click(pauseButton);
        } else if (continueButton) {
            click(continueButton);
        }
    }

    if (message.action === 'zoom-to-puzzle') {
        togglePuzzleZoom();
    }
});

waitForElement('.xwd__tool--button', insertMaximizeButton);

function togglePuzzleZoom() {
    const wholePuzzle = document.querySelector(
        '.pz-game-screen'
    ) as HTMLElement;
    if (!wholePuzzle) {
        console.warn('No puzzle found');
        return;
    }

    const navBar = document.querySelector('.pz-game-header') as HTMLElement;
    const editotialContent = document.querySelector(
        '#portal-editorial-content'
    ) as HTMLElement;

    const toolbar = document.querySelector('.pz-game-toolbar') as HTMLElement;

    if (wholePuzzle.style.transform) {
        wholePuzzle.style.transform = '';
        navBar.style.zIndex = '';
        editotialContent.style.visibility = 'visible';
        toolbar.scrollIntoView(false);
    } else {
        navBar.style.zIndex = '-99';
        editotialContent.style.visibility = 'hidden';
        wholePuzzle.style.transition = 'transform 0.3s';
        const scale = window.innerHeight / wholePuzzle.offsetHeight;

        wholePuzzle.style.transformOrigin = 'top center';
        wholePuzzle.style.transform = `scale(${scale})`;
        toolbar.scrollIntoView(true);
    }
}

function click(button: Element | null) {
    if (button) {
        (button as HTMLElement).click();
    }
}
function insertMaximizeButton() {
    const iconBar = document.querySelector('.xwd__tool--button') as HTMLElement;
    if (!iconBar) {
        return;
    }
    const maximizeIcon = document.createElement('img');
    maximizeIcon.style.width = '23px';
    maximizeIcon.src = chrome.runtime.getURL('maximize.png');

    const button = document.createElement('button');
    button.appendChild(maximizeIcon);
    button.onclick = () => {
        togglePuzzleZoom();
    };

    button.style.width = 'fit-content';
    iconBar.style.width = 'fit-content';
    iconBar.appendChild(button);
}

function waitForElement(selector: string, callback: () => void) {
    if (document.querySelector(selector)) {
        callback();
        return;
    }

    const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
            callback();
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
