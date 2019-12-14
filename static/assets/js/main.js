// Theme Switcher
// 0 = Light Theme
// 1 = Dark Theme

let themeID = 0;

$(window).on("load", function () {

	if (localStorage.getItem('theme') === 'light' || localStorage.getItem('theme') === null) {
		$('link[id="dark"]').prop('disabled', true);
		$("body").css("display", "initial");
	} else {
		$('link[id="light"]').prop('disabled', true);
		$("body").css("display", "initial");
		$('#themeSwitcher').text('Light Theme');
		themeID++;
	}

});

$('#themeSwitcher').click(function () {

	if (themeID === 1) {
		localStorage.setItem('theme', 'light');
		$('link[id="dark"]').prop('disabled', true);
		$('link[id="light"]').prop('disabled', false);
		$('#themeSwitcher').text('Dark Theme');
		themeID--;
	} else {
		localStorage.setItem('theme', 'dark');
		$('link[id="light"]').prop('disabled', true);
		$('link[id="dark"]').prop('disabled', false);
		$('#themeSwitcher').text('Light Theme');
		themeID++;
	}

});


// ----------------------------------------------------------------------------------------------------------------

// Random Banner

let randomNumber = 0;
let previousBanner = sessionStorage.getItem("bannerID");
let randomBanner = getRandomBanner();

function getRandomBanner() {

	randomNumber = Math.floor((Math.random() * 3) + 1);
	return randomNumber;
}

let header = ' rgba(0, 0, 0, 0) url("../images/banners/Banner-' + randomBanner + '.jpg") repeat scroll 50% 20% / cover';
css('.hero-wrapper', 'background', header);

while (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {

	if (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {
		randomBanner = getRandomBanner();
	}

}

sessionStorage.setItem("bannerID", randomBanner);

// Find CSS Class

function css(selector, property, value) {

	for (var i = 0; i < document.styleSheets.length; i++) {
		try {
			document.styleSheets[i].insertRule(selector + ' {' + property + ':' + value + '}', document.styleSheets[i].cssRules.length);
		} catch (err) {
			try {
				document.styleSheets[i].addRule(selector, property + ':' + value);
			} catch (err) {
			}
		}
	}

}

// ----------------------------------------------------------------------------------------------------------------

// Lightbox

$(document).on('click', '[data-toggle="lightbox"]', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

// ----------------------------------------------------------------------------------------------------------------

