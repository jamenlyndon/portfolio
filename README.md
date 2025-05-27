# Jamen Lyndon - Portfolio

Hello and welcome to the source code of my portfolio!

https://jamenlyndon.com/

## Overview
Before starting on this website I decided to create a few basic guidelines for myself.

Here's what I came up with:

1. **Keep it simple.**\
This is a small static website, so no need to overdo the tooling.\
Create it using `HTML`, `SASS` and `Javascript` only.\
Use only the required basic `npm` packages for compilation and minification.

2. **Build everything yourself.**\
This website serves to showcase your skills as a developer.\
Make it from scratch and take as little off the shelf as possible.

3. **Create a UI Kit.**\
Make a basic UI Kit page to show components / typography.

4. **Make it cool.**\
Make this website a little more shiny and fun than you otherwise would.\
Create some animations, easter eggs, etc.

5. **Showcase your code.**\
Link to GitHub and show the source code. Make sure it's neat!


**So how did it go?**\
Overall this project went pretty well and I managed to follow my guidelines for the most part. The entire thing was both designed and developed in under a week without complication or issue.

I did end up using one off the shelf package, [Isotope](https://isotope.metafizzy.co/). This allowed me to do some fancy animated filtering. It does feel a bit like cheating, but writing that feature from scratch would have been extremely difficult and time consuming. Maybe one day...

The codebase is very neat. It's simple, maintainable, well commented, easy to read, has good separation of concerns, etc.

The only caveat is that without a server side language to dynamically include files, I had to repeat myself in the HTML a little bit. Still, this is a small price to pay for not using Python, PHP or Node.js at all.

The UI Kit was created too. Nothing much there, just some buttons and the typography. Turned out to be quite a useful reference while developing. You can view it here:\
https://jamenlyndon.com/uikit/

It came together well I feel. Hopefully it will stay online in its current state for the next few years at least.

## Local development setup
To develop this website locally;

1. Clone the repository.

2. Install the required npm packages:
```
// Browse to the cloned repo
cd 'c:/where-you-cloned-the-reopo/'

// Install
npm install
```


3. Compile the `SASS` and minify the `Javascript`:
```
// Build once
npm run build

// Watch and build when changes happen
npm run watch
```

## Directory and file structure
Here's an overview of the directory and file structure.\
This should help to explain where everything is and what it does.
```javascript
/* SASS and compiled CSS
-------------------------------------------------- */
/css/
  // Main SASS file
  style.scss ( -> style.css )

  // SASS for the UI Kit page
  uikit.scss ( -> uikit.css )

  // Partial SASS files
  /_partials/
    // Entry animations
    _animations.scss

    // Buttons and links
    _buttons.scss

    // Typography
    _typography.scss

    // Variables
    _variables.scss


/* Javascript
-------------------------------------------------- */
/js/
  // Main Javascript file
  script.js  ( -> script.min.js )


/* Images
-------------------------------------------------- */
/img/
  // Favicon (in all sizes)
  /favicon/

  // Image for social media sharing
  social.jpg

  // General images
  *.svg
  *.webp


/* Fonts
-------------------------------------------------- */
/fonts/
  *.woff2


/* UI Kit page
-------------------------------------------------- */
/uikit/
  index.html


/* Projects
-------------------------------------------------- */
/project/
  // Containing folder for each project
  /some-project/
    // The project detail page
    index.html

    // Images for the project
    /img/
      *.webp


/* General
-------------------------------------------------- */
// Home page
index.html

// Git ignore
.gitignore

// npm packages
package.json
package-lock.json

// 404 redirect
.htaccess

// The favicon in traditional .ico format
.favicon
```

## Wrapping up
That's it! I hope you enjoyed this little overview of the codebase.

If you have any questions you can get in touch with me via:

e. jamenlyndon@gmail.com\
p. 0438 474 681
