# Jamen Lyndon - Portfolio

Hello and welcome to the source code of my portfolio!

https://jamenlyndon.com/

## Overview
Before starting on this website I decided to create a few basic guidelines for myself -

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

1. Clone the repository
```console
git clone https://github.com/jamenlyndon/portfolio.git
```

2. Install the required npm packages
```console
npm install
```

3. Compile the `SASS` and minify the `Javascript`
```console
# Build once
npm run build

# Watch and compile/minify when changes occur
npm run watch
```

## Directory and file structure
Here's an overview of the directory and file structure.\
This should help to explain where everything is and what it does.


```
├── index.html                # Home page
├── .gitignore                # Git ignore
├── .htaccess                 # 404 redirect
├── favicon.ico               # The favicon in traditional .ico format
├── package.json              # npm packages
│
│
├── js/                       # JAVASCRIPT
│   └── script.js                # Main JS file ( -> script.min.js )
│
│
├── css/                      # STYLES
│   ├── style.scss               # Main SASS entry point ( -> style.css )
│   ├── uikit.scss               # UI Kit specific styles ( -> uikit.css )
│   └── _partials/               # Partial SASS files
│       ├── _animations.scss        # Entry animations
│       ├── _buttons.scss           # Buttons and links
│       ├── _typography.scss        # Typography
│       └── _variables.scss         # Variables
│
│
├── img/                      # IMAGES
│   ├── favicon/                # Favicon (in all sizes)
│   ├── social.jpg              # OpenGraph image for social media sharing
│   └── *.svg, *.webp           # Images in optimised format
│
│
├── fonts/                    # FONTS
│   └── *.woff2                 # Fonts in optimised format
│
│
├── uikit/                    # UI KIT
│   └── index.html               # UI Kit page
│
│
├── project/                  # PROJECTS
    └── /some-project/           # Containing folder for each project
        ├── index.html           # Project page
        └── img/                 # Images for the project
            └── *.svg, *.webp        # Images in optimised format
```

## Wrapping up
That's it! I hope you enjoyed this little overview of the codebase.

If you have any questions you can get in touch with me via:\
jamenlyndon@gmail.com
