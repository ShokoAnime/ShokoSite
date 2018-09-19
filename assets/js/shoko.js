// Global Variables

let randomNumber;
let previousBanner = sessionStorage.getItem("bannerID");
let randomBanner = getRandomBanner();
let randomPlugin = getRandomPlugin();

let bannerInfo = [
    {
        name: "My Anime 3",
        imageURL: "assets/images/programs-plugins/my-anime-3/My-Anime-3-StreamedMP-Collection-List.jpg",
        imageName: "My Anime 3 - StreamedMP - Collection List",
        info: "Shoko, previously known as JMM (Japanese Media Manager) is an anime cataloging program designed to " +
            "automate the cataloging of your anime collection regardless of the size and number of files in your " +
            "collection, it’s even able to connect with some of the most popular media center programs out there. "
    },
    {
        name: "Shoko On Plex",
        imageURL: "assets/images/programs-plugins/shoko-on-plex/Shoko-On-Plex-Poster-Listing.jpg",
        imageName: "Shoko On Plex - Poster Listing",
        info: "Shoko, previously known as JMM (Japanese Media Manager) is an anime cataloging program designed to " +
            "automate the cataloging of your anime collection regardless of the size and number of files in your " +
            "collection, it’s even able to connect with some of the most popular media center programs out there. "
    },
    {
        name: "Nakamori",
        imageURL: "assets/images/programs-plugins/nakamori/Nakamori-Coverflow.jpg",
        imageName: "Nakamori - Cover Flow",
        info: "Nakamori takes the versatility of Kodi and combines it with the power of Shoko to bring your anime " +
            "collection to life. Unlike other anime plugin currently available for Kodi, your entire " +
            "collection’s metadata is automatically managed and made available within Kodi providing you with an " +
            "rich user experience. But that’s not all, Nakamori also handles the syncing of your episode and series " +
            "watched states and series votes automatically allowing you to keep your collection current and up-to-date."
    },
    {
        name: "Shoko Metadata",
        imageURL: "assets/images/programs-plugins/shoko-metadata/Shoko-Metadata-Series-Listing.jpg",
        imageName: "Shoko Metadata - Series Listing",
        info: "Shoko, previously known as JMM (Japanese Media Manager) is an anime cataloging program designed to " +
            "automate the cataloging of your anime collection regardless of the size and number of files in your " +
            "collection, it’s even able to connect with some of the most popular media center programs out there. "
    }
];

// Random Banner

let header = getCSSRule('.banner-container');
header.style.background = ' url("../images/banners/Banner-' + randomBanner + '.jpg") 50% 20%';
header.style.backgroundSize = 'cover';

console.log("Original Random: " + randomBanner);
console.log("Previous Random: " + previousBanner);

while (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {

    if (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {
        randomBanner = getRandomBanner();
        console.log("New Random: " + randomBanner);
    }

}

sessionStorage.setItem("bannerID", randomBanner);

// Random Plugin

console.log("Random Plugin: " + randomPlugin);
document.getElementById("plugin-name").innerHTML = bannerInfo[randomPlugin].name;
document.getElementById("plugin-info").innerHTML = bannerInfo[randomPlugin].info;
document.getElementById("plugin-image").setAttribute("src", bannerInfo[randomPlugin].imageURL);
document.getElementById("plugin-image-url").setAttribute('href', bannerInfo[randomPlugin].imageURL);
document.getElementById("plugin-image-url").setAttribute('data-title', bannerInfo[randomPlugin].imageName);

function getRandomBanner() {

    randomNumber = Math.floor((Math.random() * 10) + 1);
    return randomNumber;
}

function getRandomPlugin() {

    randomNumber = Math.floor((Math.random() * 4));
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
