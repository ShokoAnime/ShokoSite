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
        info: "My Anime is the only MediaPortal plugin available that can deliver your entire anime collection in " +
            "all it’s glory, no matter the size straight to your TV! With My Anime 3, the latest version in the " +
            "My Anime you have complete control over your entire anime collection from within MediaPortal allowing " +
            "you to customize the look and style when displaying your collection."
    },
    {
        name: "Shoko On Plex",
        imageURL: "assets/images/programs-plugins/shoko-on-plex/Shoko-On-Plex-Poster-Listing.jpg",
        imageName: "It doesn't matter if you’re at home or on the go, with Shoko On Plex you’ll always have access " +
            "to your anime collection on any device capable of running Plex, the most versatile media player " +
            "software currently available. Shoko On Plex takes your entire collections metadata and provides it " +
            "in an easy to view layout reducing clutter providing you with a sleek and minimal anime viewing experience."
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
        info: "Combine the functionality and file management provided by Shoko with Plex's robust library " +
            "functionality providing a seamless experience for Plex. Taking full advantage of the library features " +
            "offered by plex, Shoko Metadata provides users the ability to switch audio and subtitle track while " +
            "utilizing Plex's native sync features. Visual users will also be able to benefit by having file and " +
            "image info provided by Shoko built into your files for use in Plex."
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
