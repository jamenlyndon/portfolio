/* Lib
---------------------------------------------------------------------------------------------------- */
// Isotope (https://isotope.metafizzy.co/)
import Isotope from 'isotope-layout';


/* Helper functions
---------------------------------------------------------------------------------------------------- */
// Are we using a touch device?
function helper_isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Slide up and fade out an element
function helper_slideUp(target, duration) {
	target.style.transitionProperty = 'height, margin, padding, opacity';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.style.opacity = 0;

	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

// Slide down and fade in an element
function helper_slideDown(target, duration) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none') {
		display = 'block';
	}
	target.style.display = display;

	const height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.style.opacity = 1;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding, opacity";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');

	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}


/* Navigation
---------------------------------------------------------------------------------------------------- */
// Save back state when you click a project link
function nav_savePageState() {
	// Save the scroll position
	localStorage.setItem('jamenlyndon_scroll', window.scrollY);

	// Save the selected projects tag
	const projectsTag = document.querySelector('section#projects .top .tags a.selected');
	if (projectsTag) {
		localStorage.setItem('jamenlyndon_projects', projectsTag.getAttribute('tag'));
	}

	// Save the selected skills tag
	const skillsTag = document.querySelector('section#skills .top .tags a.selected');
	if (skillsTag) {
		localStorage.setItem('jamenlyndon_skills', skillsTag.getAttribute('tag'));
	}

	// Save the selected experience tag
	const experienceTag = document.querySelector('section#experience .top .tags a.selected');
	if (experienceTag) {
		localStorage.setItem('jamenlyndon_experience', experienceTag.getAttribute('tag'));
	}
}

// Restore page state
function nav_restorePageState() {
	// Restore the scroll position
	const scrollPos = localStorage.getItem('jamenlyndon_scroll');
	if (scrollPos) {
		window.scroll({
			top: parseFloat(scrollPos),
			left: 0,
			behavior: "instant",
		});

		localStorage.removeItem('jamenlyndon_scroll');
	}

	// Restore the selected projects tag
	const projectsTag = localStorage.getItem('jamenlyndon_projects');
	if (projectsTag && projectsTag !== 'all') {
		document.querySelector('section#projects .top .tags a[tag="' + projectsTag + '"]')?.click();
		localStorage.removeItem('jamenlyndon_projects');
	}

	// Restore the selected experience tag
	const skillsTag = localStorage.getItem('jamenlyndon_skills');
	if (skillsTag && skillsTag !== 'all') {
		document.querySelector('section#skills .top .tags a[tag="' + skillsTag + '"]')?.click();
		localStorage.removeItem('jamenlyndon_skills');
	}

	// Restore the selected experience tag
	const experienceTag = localStorage.getItem('jamenlyndon_experience');
	if (experienceTag && experienceTag !== 'all') {
		document.querySelector('section#experience .top .tags a[tag="' + experienceTag + '"]')?.click();
		localStorage.removeItem('jamenlyndon_experience');
	}

	// Disable all isotopes
	isotopes_disableAll();

	// Show the header instantly if we've scrolled past the banner
	const header = document.querySelector('header');
	const banner = document.querySelector('section#banner');
	if ((window.scrollY + header.offsetHeight) >= banner.offsetHeight) {
		const transition = header.style.transition;
		header.style.transition = 'none';
		header.classList.add('visible');

		window.requestAnimationFrame(function () {
			header.style.transition = transition;
		});
	}
}


/* Header
---------------------------------------------------------------------------------------------------- */
// Init
function header_init() {
	// Target the header
	const header = document.querySelector('header');

	// Target the mobile menu
	const mobileMenu = document.querySelector('nav.mobileMenu');

	// Target the mobile menu open button
	const mobileMenuOpenButton = header.querySelector('a.mobileMenuButton');

	// Target the banner
	const banner = document.querySelector('section#banner');

	// Setup a variable for debouncing
	let debounce = false;

	// Update the header on scroll
	document.addEventListener('scroll', function () {
		// If we're not debouncing
		if (!debounce) {
			/* Show or hide the header
			-------------------------------------------------- */
			// If we're scrolled past the banner
			if ((window.scrollY + header.offsetHeight) >= banner.offsetHeight) {
				// Show the header
				header.classList.add('visible');
			}
			// Otherwise, if we're not scrolled past the banner
			else {
				// Hide the header
				header.classList.remove('visible');
			}

			/* Highlight the correct nav item
			-------------------------------------------------- */
			// Get the sections
			const section_projects = document.querySelector('section#projects');
			const section_skills = document.querySelector('section#skills');
			const section_experience = document.querySelector('section#experience');
			const section_contact = document.querySelector('section#contact');

			// Get the scroll position
			const scroll_top = window.scrollY + header.offsetHeight + 1;
			const scroll_bottom = window.scrollY + window.innerHeight;

			// Get the nav items
			const desktopNav_projects = header.querySelector('.projects');
			const desktopNav_skills = header.querySelector('.skills');
			const desktopNav_experience = header.querySelector('.experience');
			const desktopNav_contact = header.querySelector('.contact');

			const mobileNav_projects = mobileMenu.querySelector('.projects');
			const mobileNav_skills = mobileMenu.querySelector('.skills');
			const mobileNav_experience = mobileMenu.querySelector('.experience');
			const mobileNav_contact = mobileMenu.querySelector('.contact');

			// Remove the currently selected nav item
			const desktopNav_selected = header.querySelector('.selected');
			if (desktopNav_selected) {
				desktopNav_selected.classList.remove('selected');
			}

			const mobileNav_selected = mobileMenu.querySelector('.selected');
			if (mobileNav_selected) {
				mobileNav_selected.classList.remove('selected');
			}

			/*
				Highlight the nav item based on two conditions;
					- If the bottom of the floating header is past the top of the section
					OR
					- If the bottom of the viewport is past the bottom of the section
			*/

			// Contact
			// For this section, we only check if the bottom of the contact details are fully in the viewport
			// This is because it's at the bottom of the screen, and this provides a better UX
			const contactDetails = section_contact.querySelector('.contactDetails');
			if (scroll_bottom >= (contactDetails.getBoundingClientRect().top + window.scrollY + contactDetails.offsetHeight)) {
				desktopNav_contact.classList.add('selected');
				mobileNav_contact.classList.add('selected');
			}
			// Experience
			else if (
				(scroll_top >= section_experience.offsetTop)
				||
				(scroll_bottom >= (section_experience.offsetTop + section_experience.offsetHeight))
			) {
				desktopNav_experience.classList.add('selected');
				mobileNav_experience.classList.add('selected');
			}
			// Skills
			else if (
				(scroll_top >= section_skills.offsetTop)
				||
				(scroll_bottom >= (section_skills.offsetTop + section_skills.offsetHeight))
			) {
				desktopNav_skills.classList.add('selected');
				mobileNav_skills.classList.add('selected');
			}
			// Projects
			else if (
				(scroll_top >= section_projects.offsetTop)
				||
				(scroll_bottom >= (section_projects.offsetTop + section_projects.offsetHeight))
			) {
				desktopNav_projects.classList.add('selected');
				mobileNav_projects.classList.add('selected');
			}

			// Turn on the debounce
			debounce = true;

			// Remove debounce after one animation frame
			window.requestAnimationFrame(function () {
				debounce = false;
			});
		}
	});

	// Update the header on load
	document.dispatchEvent(new Event('scroll'));

	// Click mobile menu open button to show mobile menu
	mobileMenuOpenButton.addEventListener('click', function () {
		if (!mobileMenu.classList.contains('visible')) {
			mobileMenu.classList.add('visible');
		}
	});

	// Click anywhere within the mobile menu to close
	mobileMenu.addEventListener('click', function () {
		if (mobileMenu.classList.contains('visible')) {
			mobileMenu.classList.remove('visible');
		}
	});
}


/* Gradient backgrounds (these move based on the mouse position)
---------------------------------------------------------------------------------------------------- */
// Init
function gradientBackgrounds_init() {
	// Disable for touch devices
	if (helper_isTouchDevice()) {
		return;
	}

	// Setup a variable for debouncing
	let debounce = false;

	// Setup variables to save the mouse position
	let xMousePos = 0;
	let yMousePos = 0;

	// On mouse move
	document.addEventListener('mousemove', function () {
		// If we're not debouncing
		if (!debounce) {
			// Save the mouse position for use in the scroll event (which does not provide the mouse position)
			xMousePos = event.pageX - window.scrollX;
			yMousePos = event.pageY - window.scrollY;

			// Update the gradient background
			gradientBackgrounds_update(xMousePos, yMousePos, event);

			// Turn on the debounce
			debounce = true;

			// Remove debounce after one animation frame
			window.requestAnimationFrame(function () {
				debounce = false;
			});
		}
	});

	// On scroll
	document.addEventListener('scroll', function () {
		// If we're not debouncing
		if (!debounce) {
			// Update the gradient background
			gradientBackgrounds_update(xMousePos, yMousePos, event);

			// Turn on the debounce
			debounce = true;

			// Remove debounce after one animation frame
			window.requestAnimationFrame(function () {
				debounce = false;
			});
		}
	});

	// On resize
	window.addEventListener('resize', function () {
		// If we're not debouncing
		if (!debounce) {
			// Update the gradient background
			gradientBackgrounds_update(xMousePos, yMousePos, event);

			// Turn on the debounce
			debounce = true;

			// Remove debounce after one animation frame
			window.requestAnimationFrame(function () {
				debounce = false;
			});
		}
	});
}

// Update
function gradientBackgrounds_update(xMousePos, yMousePos) {
	// Setup a variable for the transition class remove timeout
	let transitionTimeout = setTimeout(function () {}, 0);

	// Target the gradient backgrounds
	const gradientBackgrounds = document.querySelectorAll('.gradientBackground');

	// Move the banner backgrounds
	gradientBackgrounds.forEach((background) => {
		// Get the x and y mouse position relative to the background's containing <section> as a percentage
		const section = background.closest('section');
		let xPos = (xMousePos - section.getBoundingClientRect().left) / (section.offsetWidth) * 100;
		let yPos = (yMousePos - section.getBoundingClientRect().top) / (section.offsetHeight) * 100;

		// Limit the x and y mouse position to between 0 and 100 (sanity fix for percentages)
		if (xPos < 0) {
			xPos = 0;
		}
		else if (xPos > 100) {
			xPos = 100;
		}

		if (yPos < 0) {
			yPos = 0;
		}
		else if (yPos > 100) {
			yPos = 100;
		}

		// Calculate these total percentages as 50% of the size of the background's containing <section>
		xPos = (section.offsetWidth / 2) / 100 * xPos;
		yPos = (section.offsetHeight / 2) / 100 * yPos;

		// Apply this as a transform CSS property (using negative values)
		background.style.transform = 'translate(-' + xPos + 'px, -' + yPos + 'px)';

		// Remove the transition (delay by 200ms to allow the transition to animate)
		// This helps mouse movement to look more responsive
		transitionTimeout = setTimeout(function () {
			if (!background.classList.contains('noTransition')) {
				background.classList.add('noTransition');
			}
		}, 200);
	});
}


/* Entry animations
----------------------------------------------------------------------------------------------------
Animations are triggered when an element is on screen or above the viewport.

To use these simply add the following classes to any HTML element:
	'entry'
		Required.
		Adds an entry animation.

	'entry-slideUp', 'entry-slideDown', 'entry-slideLeft', 'entry-slideRight'
		Required.
		Choose the entry animation style, defined in /css/partials/_animations.scss

	'entry-inView100', 'entry-inView75', 'entry-inView50', 'entry-inView25'
		Optional (defaults to 0%).
		Choose what percentage of the element must be visible past the viewport bottom to trigger the animation.
*/
// Init
function entryAnimations_init() {
	// Delay for fade in
	setTimeout(entryAnimations_update, 200);
}

// Update
function entryAnimations_update() {
	// Once per animation frame
	window.requestAnimationFrame(function () {
		// Animation delay
		let delay = 0;

		// --------------------------------------------------

		// Get the trigger on load entry animation items
		const entryItems_triggerOnLoad = document.querySelectorAll('.entry.entry-triggerOnLoad:not(.entry-triggered)');

		// For each item
		entryItems_triggerOnLoad.forEach(item => {
			// Add the 'entry-triggered' class so we don't attach events more than once
			item.classList.add('entry-triggered');

			// Add the 'entry-active' class to show the item
			item.classList.add('entry-active');

			// Delay other items by 200ms
			delay = 200;
		});

		// --------------------------------------------------

		// Get the untriggered entry animation items
		const entryItems = document.querySelectorAll('.entry:not(.entry-triggered)');

		// For each item
		entryItems.forEach(item => {
			// Check 100%, 75%, 50%, 25%, 0% (based on classname)
			// of the item's height past the viewport bottom to trigger showing item
			let showItem = false;
			const viewportBottom = (window.innerHeight + window.scrollY);

			// 100%
			if (item.classList.contains('entry-inView100')) {
				if (viewportBottom >= ((item.getBoundingClientRect().top + item.offsetHeight) + window.scrollY)) {
					showItem = true;
				}
			}
			// 75%
			else if (item.classList.contains('entry-inView75')) {
				if (viewportBottom >= ((item.getBoundingClientRect().top + ((item.offsetHeight / 100) * 75)) + window.scrollY)) {
					showItem = true;
				}
			}
			// 50%
			else if (item.classList.contains('entry-inView50')) {
				if (viewportBottom >= ((item.getBoundingClientRect().top + ((item.offsetHeight / 100) * 50)) + window.scrollY)) {
					showItem = true;
				}
			}
			// 25%
			else if (item.classList.contains('entry-inView25')) {
				if (viewportBottom >= ((item.getBoundingClientRect().top + ((item.offsetHeight / 100) * 25)) + window.scrollY)) {
					showItem = true;
				}
			}
			// 0%
			else if (viewportBottom >= (item.getBoundingClientRect().top + window.scrollY)) {
				showItem = true;
			}


			// If we're showing the item
			if (showItem) {
				// Add the 'entry-triggered' class so we don't attach events more than once
				item.classList.add('entry-triggered');

				// If the item is 100% ABOVE the viewport, then don't delay it - just show it straight away.
				// This helps because the page can load already scrolled pretty far down the page.
				if (window.scrollY > (item.getBoundingClientRect().top + window.scrollY + item.offsetHeight)) {
					delay = 0;
				}

				// Delay showing it by the current delay amount
				setTimeout(function () {
					// Add the 'entry-active' class to show the item
					item.classList.add('entry-active');

					// Reduce the delay by 200ms, as this animation is done
					delay -= 200;
				}, delay);
			}

			// Delay the next item by 200ms
			delay += 200;
		});

		// -------------------------------------------------

		// Call this function again to keep the animation frame loop going
		entryAnimations_update();
	});
}


/* Links
---------------------------------------------------------------------------------------------------- */
// Init
function links_init() {
	// Get all the links
	const links = document.querySelectorAll('a');

	// For each link
	links.forEach(link => {
		// Remove focus on click
		// This ensures that the active / focused state doesn't remain stuck on for mobile
		link.addEventListener('click', function () {
			document.activeElement.blur();
		});
	});
}


/* Isotopes
---------------------------------------------------------------------------------------------------- */
// Init
function isotopes_init() {
	// Create a variable to hold our timeout
	let disableIsotopesTimeout = setTimeout('', 1);

	// Create a variable to hold our isotopes
	const isotopes = [];

	// Target the tag areas
	const tagAreas = document.querySelectorAll('.tags');

	// For each tag area
	tagAreas.forEach(tagArea => {
		// Get the tag id
		const tagId = tagArea.getAttribute('tag-id');

		// Targe the filter area
		const filterArea = document.getElementById(tagId);

		// Get the isotope gutter size
		const isotopeGutter = filterArea.getAttribute('isotope-gutter');

		// Create the isotope
		isotopes[tagId] = new Isotope('#' + tagId, {
			masonry: {
				columnWidth: '#' + tagId + ' .isotope-sizer',
				gutter: '.isotope-gutter'
			},
			itemSelector: '#' + tagId + ' .isotope-item',
			transitionDuration: '0.4s'
		});

		// Get the tag links
		const tagLinks = tagArea.querySelectorAll('a');

		// For each tag link
		tagLinks.forEach(tagLink => {
			// On click
			tagLink.addEventListener('click', function () {
				// If the tag link is already selected, don't do anything
				if (tagLink.classList.contains('selected')) {
					return;
				}

				// Remove the currently selected tag
				const selectedTag = tagArea.querySelector('.selected');
				if (selectedTag) {
					selectedTag.classList.remove('selected');
				}

				// Select the clicked tag
				if (!this.classList.contains('selected')) {
					this.classList.add('selected');
				}

				// Get the tags to show
				const targetTags = this.getAttribute('tag').replace(' ', '').split(',');

				// Create a variable to hold the filter selector query string
				let filterString = '';

				// For each tag to show, build the filter query string (but don't do this if we've selected 'all')
				if (typeof targetTags[0] === 'undefined' || targetTags[0] !== 'all') {
					targetTags.forEach(targetTag => {
						filterString += '[tag*=' + targetTag + ']';
					});
				}

				// Enable this isotope
				isotopes_enable(filterArea);

				// Filter this isotope (next animation frame)
				window.requestAnimationFrame(function () {
					isotopes[tagId].arrange({ filter: filterString });
				});

				// Wait for the the filtering and re-arrange to complete, then disable this isotope
				clearTimeout(disableIsotopesTimeout);
				disableIsotopesTimeout = setTimeout(function () {
					isotopes_disable(filterArea);
				}, 600);
			});
		});
	});

	// Disable all isotopes to start with
	isotopes_disableAll();
}

// Enable an isotope
function isotopes_enable(filterArea) {
	// Enable the isotope for this filter area
	if (filterArea.classList.contains('disableIsotope')) {
		filterArea.classList.remove('disableIsotope');
	}
}

// Disable an isotope
function isotopes_disable(filterArea) {
	// Disable the isotope for this filter area
	if (!filterArea.classList.contains('disableIsotope')) {
		filterArea.classList.add('disableIsotope');
	}
}

// Disable all isotopes
function isotopes_disableAll() {
	// Target the tag areas
	const tagAreas = document.querySelectorAll('.tags');

	// For each tag area
	tagAreas.forEach(tagArea => {
		// Get the tag id
		const tagId = tagArea.getAttribute('tag-id');

		// Get the tag filter area DOM element
		const filterArea = document.getElementById(tagId);

		// Disable the isotope for this filter area
		if (!filterArea.classList.contains('disableIsotope')) {
			filterArea.classList.add('disableIsotope');
		}
	});
}


/* Projects
---------------------------------------------------------------------------------------------------- */
// Init
function projects_init() {
	// Get the project links
	const projects = document.querySelectorAll('section#projects a.project');

	// For each project link
	projects.forEach(project => {
		// On click of a project, save the page state
		project.addEventListener('click', nav_savePageState);
	});
}


/* Experience
---------------------------------------------------------------------------------------------------- */
// Init
function experience_init() {
	/* Target the required elements
	---------------------------------------- */
	// Target the experience section
	const section = document.querySelector('section#experience');

	// Target the show more button
	const showMoreButton = section.querySelector('.showMoreButton a');

	// Target the hidden experience area
	const moreExperience = section.querySelector('.moreExperience');

	// Target the positions
	const positions = section.querySelectorAll('.position');

	// Target the main tags
	const mainTags = section.querySelectorAll('.tags a.button');

	// Target the inline tags
	const inlineTags = section.querySelectorAll('.inlineTags a.button');

	// Target the descriptions
	const descriptions = section.querySelectorAll('.description');


	/* Description expand / collapse toggle
	---------------------------------------- */
	// For each position
	positions.forEach(position => {
		// Target the clickable area
		const clickableArea = position.querySelector('.top');

		// Target the description
		const description = position.querySelector('.description');

		// Expand or collapse on click
		clickableArea.addEventListener('click', function () {
			// Collapse
			if (position.classList.contains('expanded')) {
				position.classList.remove('expanded');
				helper_slideUp(description, 400);
			}
			// Expand
			else {
				// Collapse any open descriptions
				const openPosition = section.querySelector('.position.expanded .top');
				if (openPosition) {
					openPosition.click();
				}

				// Expand this description
				position.classList.add('expanded');
				helper_slideDown(description, 400);
			}
		});
	});


	/* Inline tag click actions
	---------------------------------------- */
	// For each inline tag
	inlineTags.forEach(inlineTag => {
		// On click
		inlineTag.addEventListener('click', function () {
			// If it's already selected, deselect it
			if (inlineTag.classList.contains('selected')) {
				// Click the 'all' main tag
				section.querySelector(".tags a.button[tag='all']").click();
			}
			// Otherwise, select it
			else {
				// Get the inline tag attribute
				const inlineTag_attribute = inlineTag.getAttribute('tag');

				// For each main tag
				mainTags.forEach(mainTag => {
					// Get the main tag attribute
					const mainTag_attribute = mainTag.getAttribute('tag');

					// If they match
					if (inlineTag_attribute === mainTag_attribute) {
						// Click the main tag
						mainTag.click();
					}
				});
			}
		});
	});


	/* Main tag click actions
	---------------------------------------- */
	// For each main tag
	mainTags.forEach(mainTag => {
		// On click
		mainTag.addEventListener('click', function () {
			// If we clicked the 'all' tag
			if (mainTag.getAttribute('tag') === 'all') {
				// Show the "show more experience" button
				helper_slideDown(showMoreButton, 400);

				// Hide all hidden experience
				if (moreExperience.classList.contains('expanded')) {
					moreExperience.classList.remove('expanded');
					showMoreButton.innerHTML = '<span>Show more experience</span>';
					moreExperience.style.display = 'none';
				}
			}
			// Otherwise we've clicked a different tag
			else {
				// Hide the "show more experience" button
				helper_slideUp(showMoreButton, 400);

				// Show all hidden experience
				if (!moreExperience.classList.contains('expanded')) {
					moreExperience.classList.add('expanded');
					showMoreButton.innerHTML = '<span>Show less experience</span>';
					moreExperience.style.display = 'block';
				}
			}

			// Get the clicked main tag attribute
			const mainTag_attribute = mainTag.getAttribute('tag');

			// For each inline tag
			inlineTags.forEach(inlineTag => {
				// Get the inline tag attribute
				const inlineTag_attribute = inlineTag.getAttribute('tag');

				// If they match
				if (inlineTag_attribute === mainTag_attribute) {
					// Select the inline tag
					if (!inlineTag.classList.contains('selected')) {
						inlineTag.classList.add('selected');
					}
				}
				// Otherwise if they don't match
				else {
					// Deselect the inline tag
					if (inlineTag.classList.contains('selected')) {
						inlineTag.classList.remove('selected');
					}
				}
			});
		});
	});


	/* Show more / less experience toggle
	---------------------------------------- */
	showMoreButton.addEventListener('click', function () {
		// Show less
		if (moreExperience.classList.contains('expanded')) {
			moreExperience.classList.remove('expanded');
			showMoreButton.innerHTML = '<span>Show more experience</span>';
			helper_slideUp(moreExperience, 800);
			window.location.href = '#experience';
		}
		// Show more
		else {
			moreExperience.classList.add('expanded');
			showMoreButton.innerHTML = '<span>Show less experience</span>';
			helper_slideDown(moreExperience, 800);
		}
	});


	/* Setup initial state
	---------------------------------------- */
	// Collapse all descriptions
	descriptions.forEach(description => {
		helper_slideUp(description, 0);
	});

	// Hide the more experience area
	helper_slideUp(moreExperience, 0);
}


/* Loading
---------------------------------------------------------------------------------------------------- */
// Fade in the page
function loading_fadeIn() {
	// Show the page
	document.body.classList.add('loaded');
}

// Show the loading spinner
function loading_showLoadingSpinner() {
	// Delay for 2s (this improves ux, no need to show it for a quick load time)
	setTimeout(function () {
		const spinner = document.querySelector('.loadingSpinner');
		if (spinner) {
			spinner.classList.add('visible');
		}
	}, 2000);
}


/* Main
---------------------------------------------------------------------------------------------------- */
// Init
function main_init() {
	// Show easter egg console message to developers
	console.log('       __                           __                   __           \n      / /____ ____ ___  ___  ____  / /  __  ______  ____/ /___  ____  \n __  / / __  / __  __ \\/ _ \\/ __ \\/ /  / / / / __ \\/ __  / __ \\/ __ \\ \n/ /_/ / /_/ / / / / / /  __/ / / / /__/ /_/ / / / / /_/ / /_/ / / / / \n\\____/\\____/_/ /_/ /_/\\___/_/ /_/_____|__  /_/ /_/\\____/\\____/_/ /_/(_)\n                                     /____/                           \n\n');
	console.log('\n🚀 Greetings traveller! Welcome to my portfolio.\n\n');
	console.log('\nWant to check out the source code for this site?\nhttps://github.com/jamenlyndon/portfolio/\n\n');
	console.log('');

	// Show the loading spinner
	loading_showLoadingSpinner();

	// On load
	window.addEventListener('load', function () {
		// Init links
		links_init();

		// Init entry animations
		entryAnimations_init();

		// If we're on the homepage or uikit
		if (!document.querySelector('#projectDetail') && !document.querySelector('#uikit')) {
			// Init header
			header_init();

			// Init gradient backgrounds
			gradientBackgrounds_init();

			// Init isotopes
			isotopes_init();

			// Init projects
			projects_init();

			// Init experience
			experience_init();

			// Restore the page state
			nav_restorePageState();
		}

		// Fade in the page
		loading_fadeIn();
	});
}

// All systems go! 🚀
main_init();
