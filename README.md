# Introduction

This repository contains code for the Open University course: Webapplicaties: de clientkant (Webapplications: the client side)

The result: [The Game Site](index.html) or [The Snake Game](snake.html)

### Collaborators:

* Aart Pelt (a.j.w.pelt@gmail.com)
* Onno Huijgen (o.huijgen@gmail.com)

# Assignment 1
## Main site
This part focusses on the HTML and CSS bit.

Layout:
header : title of the website
center : an area with a border (arena) and a menu (nav) and iframe (gameFrame) within
footer : copyright notice and last modification date

Styling:
Margins and paddings, colors and text attributes are explicitly named. This makes it easier to experiment with different styles. Before the site enters the production stage, it's possible to refactor some of the styles.

Positioning:
In order to create a responsive website relative measurements like **em** and **%** have been chosen.
Also the 'arena'-elements are positioned in a floating manner.

The website has been tested with the browsers Google Chrome and Safari on Apple OS X.

# Assignment 2
## Snake part One
This part focusses on Javascript. In order to let the code be tested by the instructor the requirements have to be met precisely.

The functions collidesWithOneOf and canMove/doMove are added as methods to Element and Snake respectively.

In order to determine the new position of the snake's head the method Snake.createNewHead was added. This method is now called both in canMove as doMove. It would be better if canMove returned a segment (type Element) if movement is possible. The doMove modify the snake segments.

An attempt was made to execute the tests from the command line using mocha/chai. Because of the difference in coding for the browser and coding for node, you would need something like **browserify** and a build system in place. Because this falls outside the scope of this course, tests are executed from a webpage.

# Assignment 3
## Snake part Two
In this part refactoring the code into modules is needed. Separate the model from the view and controller.

The code follow the Constructor/Prototype pattern. The canvas, element, food and snake are part of the model. On top of that a sound class has been added. Some generic functions are stored in a separate Javascript file called util.js. In order to play the game a controller class is created which controls the view (DOM, UI, HTML) and communicates with the model to instantiate the required objects.

The view has been updated with [Font Awesome](http://fontawesome.io/) so the buttons now contain icons instead of text.

# Documentation
The code is annotated with [JSdoc3](http://usejsdoc.org/). The generator is installed using node/npm. An extra module (docstrap) is added to allow the use of templates. Versions of node and npm are controlled by [nvm](https://github.com/creationix/nvm).
```
npm install -g jsdoc ink-docstrap
```
In order to configure the generator a JSON file **snake.jsdoc.json** is present.
See: [http://usejsdoc.org/about-configuring-jsdoc.html](http://usejsdoc.org/about-configuring-jsdoc.html)

The documentation is generated with the following command:
```
jsdoc --access all --verbose --configure snake.jsdoc.json --template ~/.nvm/versions/node/v8.9.3/lib/node_modules/ink-docstrap/template --readme README.md --destination doc
```
See also: [http://usejsdoc.org/about-commandline.html](http://usejsdoc.org/about-commandline.html)

And can be accessed from [here](doc/index.html).

# Testing
The testing framework that is used is Mocha in combination with Chai. Due to the absence of a build system the tests are executed from the [test page](snake-test.html).

# TO DO
1. ~~Submit code to version control (git).~~
2. ~~Convert this readme to MarkDown syntax.~~
3. ~~Select IDE for development or can we live with Atom and Chrome (using debug tools)?~~ => Atom/Chrome
4. CSS height: 100% needs further examination.
5. Trying to get a grip on relative measurements. It's possible some values need to be fixed.
6. Resizing of the site is not yet optimal.
7. ~~Recruit team member~~
8. Document CSS structure
9. ~~Solve CSS validation errors: replaced color names by color numbers (apparently not all browsers can handle these names)~~
10. Fix HTML errors
11. ~~Are we using the English or Dutch language for documentation and comments. The course is in Dutch, but the code has English language elements and if you decide to release the code to an international public, the Dutch language might seem a little odd~~ => English.
12. Get JSlint to work
13. ~~Refactor test to mocha/chai framework~~
14. Util tests are executed, but no output is shown.
15. Get rid of the iFrame and use jQuery to load/display html content.
16. ...
