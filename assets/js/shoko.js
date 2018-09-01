randomBanner = Math.floor((Math.random() * 4) + 1);

let header = getCSSRule('.banner-container');
header.style.background = ' url("../images/banners/Banner-' + randomBanner + '.jpg") 50% 20%';
header.style.backgroundSize = 'cover';

console.log(randomBanner);
console.log(dupeBannerCheck);

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
