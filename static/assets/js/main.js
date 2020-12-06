// Theme Switch
// 0 = Light Theme
// 1 = Dark Theme

let themeID = 0;

window.onload = function () {

	if (localStorage.getItem('theme') === 'light' || localStorage.getItem('theme') === null) {
		document.getElementById("dark").disabled = true;
		document.body.style.display = 'initial';
		document.getElementById('themeSwitcher').classList.remove('fa-sun');
		document.getElementById('themeSwitcher').classList.add('fa-moon');
		document.getElementById('mobileThemeSwitcher').textContent='Dark Theme';
	} else {
		document.getElementById("light").disabled = true;
		document.body.style.display = 'initial';
		document.getElementById('themeSwitcher').classList.remove('fa-moon');
		document.getElementById('themeSwitcher').classList.add('fa-sun');
		document.getElementById('mobileThemeSwitcher').textContent='Light Theme';
		themeID++;
	}

};

document.getElementById("themeSwitcher").onclick = function () {

	if (themeID === 1) {
		localStorage.setItem('theme', 'light');
		document.getElementById("dark").disabled = true;
		document.getElementById("light").disabled = false;
		document.getElementById('themeSwitcher').classList.remove('fa-sun');
		document.getElementById('themeSwitcher').classList.add('fa-moon');
		themeID--;
	} else {
		localStorage.setItem('theme', 'dark');
		document.getElementById("dark").disabled = false;
		document.getElementById("light").disabled = true;
		document.getElementById('themeSwitcher').classList.remove('fa-moon');
		document.getElementById('themeSwitcher').classList.add('fa-sun');
		themeID++;
	}

};

document.getElementById("mobileThemeSwitcher").onclick = function () {

	if (themeID === 1) {
		localStorage.setItem('theme', 'light');
		document.getElementById("dark").disabled = true;
		document.getElementById("light").disabled = false;
		document.getElementById('mobileThemeSwitcher').textContent='Dark Theme';
		themeID--;
	} else {
		localStorage.setItem('theme', 'dark');
		document.getElementById("dark").disabled = false;
		document.getElementById("light").disabled = true;
		document.getElementById('mobileThemeSwitcher').textContent='Light Theme';
		themeID++;
	}

};

// ----------------------------------------------------------------------------------------------------------------

// Random Banner
let randomNumber = 0;
let previousBanner = sessionStorage.getItem("bannerID");
let randomBanner = getRandomBanner();
let languages = ["de"];

function getRandomBanner() {
	randomNumber = Math.floor((Math.random() * 7) + 1);
	console.log(`randomNumber initial: ${randomNumber}`)
	return randomNumber;
}

while (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {
	if (parseInt(randomBanner, 10) === parseInt(previousBanner, 10)) {
		randomBanner = getRandomBanner();
		console.log(`randomNumber second: ${randomNumber}`)
	}
}

// Check to see if the user is visiting a translated page.
if (document.body.classList.contains('lang-en')) {
	header = 'rgba(0, 0, 0, 0) url("/assets/images/banners/Banner-' + randomBanner + '.jpg") repeat scroll 50% 20% / cover';
} else {
	header = 'rgba(0, 0, 0, 0) url("/assets/images/banners/Banner-' + randomBanner + '.jpg") repeat scroll 50% 20% / cover';
}

// Hero is only used on the index page while the other is used on every other page.
css('.hero-wrapper', 'background', header);
css('.random-banner', 'background', header);

sessionStorage.setItem("bannerID", randomBanner);

// ----------------------------------------------------------------------------------------------------------------

//Staff Bio Section
function staffBio(id) {

	let previousID = sessionStorage.getItem("previousID");

	css('.staff-info-wrapper', 'display', 'none');
	css('.' + previousID, 'display', 'none !important');
	css('.' + id, 'display', 'initial !important');

	sessionStorage.setItem("previousID", id);

}

// ----------------------------------------------------------------------------------------------------------------

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

// Sidenav
function openNav() {
	document.getElementById("mobileSidenav").style.display = "initial";
	document.getElementById('mobileSidenav').classList.add('sidenav');
	document.getElementById("mobileSidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById("mobileSidenav").style.width = "0";
}

// ----------------------------------------------------------------------------------------------------------------

// Nav Search
function searchBox(){
	css('#searchbox', 'display', 'initial');
}

// ----------------------------------------------------------------------------------------------------------------

//Lightbox - Has to be last.
document.addEventListener('DOMContentLoaded',function(){
	new SmartPhoto(".js-smartPhoto",{
		resizeStyle: 'fit'
	});
});