window.onload = () => {
    passwordHandling();
    fontSizeHandling();
    toggleButtonHandling();
    setFontSizeFromLocalStorage();
};

// Password Handling
function passwordHandling() {
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const repeatPasswordInput = document.getElementById("repeatPassword") as HTMLInputElement;
    const errorMessage = document.getElementById("error-message") as HTMLDivElement;

    let passwordTouched = false;
    let repeatPasswordTouched = false;

    passwordInput.addEventListener("blur", () => {
        passwordTouched = true;
        checkPasswordMatchAndShowError();
    });

    repeatPasswordInput.addEventListener("blur", () => {
        repeatPasswordTouched = true;
        checkPasswordMatchAndShowError();
    });

    function checkPasswordMatchAndShowError() {
        if (passwordTouched && repeatPasswordTouched) {
            const password = passwordInput.value;
            const repeatPassword = repeatPasswordInput.value;
            errorMessage.textContent = password !== repeatPassword ? "Passwords do not match." : "";
        }
    }
}

// Toggle Button Handling
function toggleButtonHandling() {
    const button = document.getElementById("btn-toggle");
    const element = document.getElementById("settingFont");

    button?.addEventListener("click", () => {
        const currentRight = parseInt(getComputedStyle(element!).right);
        element!.style.right = (currentRight === -200 ? 0 : -200) + "px";
    });
}

// Font Size Handling
function fontSizeHandling() {
    const fontElements = document.querySelectorAll('li[data-font]');
    
    const applyFontSize = (fontSize: string) => {
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
        localStorage.setItem('fontSize', fontSize);
    };

    fontElements.forEach(el => {
        el.addEventListener('click', () => {
            const newFontSize = el.getAttribute('data-font');
            if (newFontSize) {
                applyFontSize(newFontSize);
                setActive(newFontSize, fontElements);
            }
        });
    });

    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        setActive(fontSize, fontElements);
    }

    function setActive(fontSize: string, fontElements: NodeListOf<Element>) {
        fontElements.forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('data-font') === fontSize) {
                el.classList.add('active');
            }
        });
    }
}

// Font Size Form Local Storage Handling
function setFontSizeFromLocalStorage() {
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    }
}



