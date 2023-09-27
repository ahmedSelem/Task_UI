window.onload = function () {
    passwordHandling();
    fontSizeHandling();
    toggleButtonHandling();
    setFontSizeFromLocalStorage();
};
// Password Handling
function passwordHandling() {
    var passwordInput = document.getElementById("password");
    var repeatPasswordInput = document.getElementById("repeatPassword");
    var errorMessage = document.getElementById("error-message");
    var passwordTouched = false;
    var repeatPasswordTouched = false;
    passwordInput.addEventListener("blur", function () {
        passwordTouched = true;
        checkPasswordMatchAndShowError();
    });
    repeatPasswordInput.addEventListener("blur", function () {
        repeatPasswordTouched = true;
        checkPasswordMatchAndShowError();
    });
    function checkPasswordMatchAndShowError() {
        if (passwordTouched && repeatPasswordTouched) {
            var password = passwordInput.value;
            var repeatPassword = repeatPasswordInput.value;
            errorMessage.textContent = password !== repeatPassword ? "Passwords do not match." : "";
        }
    }
}
// Toggle Button Handling
function toggleButtonHandling() {
    var button = document.getElementById("btn-toggle");
    var element = document.getElementById("settingFont");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
        var currentRight = parseInt(getComputedStyle(element).right);
        element.style.right = (currentRight === -200 ? 0 : -200) + "px";
    });
}
// Font Size Handling
function fontSizeHandling() {
    var fontElements = document.querySelectorAll('li[data-font]');
    var applyFontSize = function (fontSize) {
        document.documentElement.style.setProperty('--font-size', "".concat(fontSize, "px"));
        localStorage.setItem('fontSize', fontSize);
    };
    fontElements.forEach(function (el) {
        el.addEventListener('click', function () {
            var newFontSize = el.getAttribute('data-font');
            if (newFontSize) {
                applyFontSize(newFontSize);
                setActive(newFontSize, fontElements);
            }
        });
    });
    var fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        setActive(fontSize, fontElements);
    }
    function setActive(fontSize, fontElements) {
        fontElements.forEach(function (el) {
            el.classList.remove('active');
            if (el.getAttribute('data-font') === fontSize) {
                el.classList.add('active');
            }
        });
    }
}
// Font Size Form Local Storage Handling
function setFontSizeFromLocalStorage() {
    var fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        document.documentElement.style.setProperty('--font-size', "".concat(fontSize, "px"));
    }
}
