/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

// Hold the navigation list (ul)
const navBar = document.querySelector('#navbar__list');

// Hold the list of sections
const sections = document.querySelectorAll('section');

// Hold the button used to scroll to top
const goUpButton = document.querySelector('#go-up-btn');

// Hold the active navigation item
let activeNav = document.querySelector('.nav__active');

// Hold the active section
let activeSection = document.querySelector('.section__active');

// Hold the last Y position of the window, so we can determine if user is scrolling down or up
let lastScrollY = 0;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Remove section__active class from the previous section
// Add section__active class to the new section
function setActiveSection(section) {
    activeSection.classList.remove('section__active');
    section.classList.add('section__active');
    activeSection = section;
}

// Remove nav__active class from the previous navigation item
// Add nav__active class to the new navigation item
function setActiveNav(nav) {
    activeNav.classList.remove('nav__active');
    nav.classList.add('nav__active');
    activeNav = nav;
}

// Scroll section into view when click on navigation item
function scrollToSection(event) {
    const section = document.querySelector(`#${event.target.dataset.id}`);
    section.scrollIntoView({behavior: 'smooth'});
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the navigation item
function buildNavItem(section) {
    const navItem = document.createElement('li');
    navItem.classList.add('menu__link');
    navItem.textContent = section.dataset.nav;
    navItem.setAttribute('data-id', section.id);
    navItem.id = `nav-${section.id}`;
    // It can be null at the first time since there is no nav item
    if (activeNav == null) {
        navItem.classList.add('nav__active');
        activeNav = navItem;
    }
    return navItem;
}

// Build the menu
// Use fragment to avoid browser reflows and repaints many times
function buildMenu() {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const navItem = buildNavItem(section);
        fragment.appendChild(navItem);
    }
    navBar.appendChild(fragment);
}

// Change active class of section and navigation item when scroll
// Display and hide scroll to top button
function changeActiveClass() {
    const viewportHeight = window.innerHeight;
    let ratioForActive;

    if (window.scrollY > 500) {
        goUpButton.classList.remove('hide');
    } else {
        goUpButton.classList.add('hide');
    }

    if (window.scrollY > lastScrollY) {
        ratioForActive = viewportHeight / 3;
    } else {
        ratioForActive = viewportHeight * 2 / 3;
    }

    lastScrollY = window.scrollY;

    for (section of sections) {
        const position = section.getBoundingClientRect();
        if (position.top < ratioForActive && position.bottom > ratioForActive && section !== activeSection) {
            setActiveSection(section);
            setActiveNav(document.querySelector(`#nav-${section.id}`));
            break;
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
buildMenu();

// Scroll to section on link click
navBar.addEventListener('click', scrollToSection);

// Set section and navigation item as active
document.addEventListener('scroll', changeActiveClass);

// Scroll to top
goUpButton.addEventListener('click', scrollToTop);
