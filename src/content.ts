chrome.runtime.onMessage.addListener(message => {
    if (message.action === 'click-pencil') {
        const pencilButton = document.querySelector(
            '#portal-game-toolbar > div > ul > li:nth-child(6) > button > i'
        );
        click(pencilButton);
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

    if (message.action === 'jump-to-clue') {
        jumpToClueSetup();
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
function jumpToClueSetup() {
    const iconBar = document.querySelector('.xwd__tool--button') as HTMLElement;
    if (!iconBar) {
        return;
    }
    const existingClueInput = document.querySelector(
        '#clue-input'
    ) as HTMLElement;
    if (existingClueInput) {
        existingClueInput.remove();
        return;
    }

    const clueInput = document.createElement('input');
    clueInput.id = 'clue-input';
    clueInput.style.width = '50px';
    clueInput.type = 'number';

    const actualJump = () => {
        const clueLabels = document.querySelectorAll('.xwd__clue--label');
        for (const clueLabel of clueLabels) {
            if (clueLabel.textContent === clueInput.value) {
                (clueLabel as HTMLElement).click();
                break;
            }
        }
    };

    iconBar.appendChild(clueInput);

    clueInput.onblur = () => {
        clueInput.remove();
    };

    clueInput.onkeydown = e => {
        e.preventDefault();
        switch (e.key) {
            case 'Enter':
                actualJump();
                return;
            case 'Backspace':
            case 'Delete':
                clueInput.value = '';
                clueInput.focus();
                return;
            case 'Escape':
                clueInput.remove();
                return;
        }
        const isNumber = /^[0-9]$/i.test(e.key);
        if (!isNumber) {
            return;
        }
        clueInput.value = `${clueInput.value.trim()}${e.key}`;
    };

    clueInput.focus();
}
