let randomNumber;
let previousBanner = sessionStorage.getItem("bannerID");
let randomBanner = getRandomBanner(randomNumber);

let header = getCSSRule('.banner-container');
header.style.background = ' url("../images/banners/Banner-' + randomBanner + '.jpg") 50% 20%';
header.style.backgroundSize = 'cover';

console.log("Original Random: " + randomBanner);
console.log("Previous Random: " + previousBanner);

while (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {

    if (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {
        randomBanner = getRandomBanner(randomNumber);
        console.log("New Random: " + randomBanner);
    }

}

sessionStorage.setItem("bannerID", randomBanner);

function getRandomBanner() {
    randomNumber = Math.floor((Math.random() * 10) + 1);
    return randomNumber;
}

function getCSSRule(ruleName) {

    ruleName = ruleName.toLowerCase();
    let result = null;
    let find = Array.prototype.find;

    find.call(document.styleSheets, styleSheet => {
        result = find.call(styleSheet.cssRules, cssRule => {
            return cssRule instanceof CSSStyleRule
                && cssRule.selectorText.toLowerCase() == ruleName;
        });

        return result != null

    });

    return result;

}
