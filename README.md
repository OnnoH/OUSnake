# Introduction

This repository contains code for the Open University course: Webapplicaties: de clientkant (Web applications: the client side)

The result: [The Game Site](index.html) or [The Snake Game](snake.html)

### Collaborators:

* Aart Pelt (a.j.w.pelt@gmail.com)
* Onno Huijgen (o.huijgen@gmail.com)

# 1. Assignment 1
## 1.1 Main site
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

# 2. Assignment 2: Snake part One
This part focusses on Javascript. In order to let the code be tested by the instructor the requirements have to be met precisely.

The functions collidesWithOneOf and canMove/doMove are added as methods to Element and Snake respectively.

In order to determine the new position of the snake's head the method Snake.createNewHead was added. This method is now called both in canMove as doMove. It would be better if canMove returned a segment (type Element) if movement is possible. The doMove modify the snake segments.

An attempt was made to execute the tests from the command line using mocha/chai. Because of the difference in coding for the browser and coding for node, you would need something like **browserify** and a build system in place. Because this falls outside the scope of this course, tests are executed from a webpage.

# 3. Assignment 3: Snake part Two
In this part refactoring the code into modules is needed. Separate the model from the view and controller.

# 3.1. Architecture
The application follows the MVC architecture pattern.

View: The view is responsible DOM interaction (including canvas and sound) and events (buttons, keys and custom events).
Model: The model is used to store data. They are ignorant to a wider context.
Controller: The controller handles the responses to events by updating the model and/or the view.

most modules are structured according to the "object model pattern" which is a specific form of the model pattern. It has a single object per module. As a result, the model, view and controller each contain several modules.

# 3.1.1. View
snakeGame acts as the view module. It handles the events and key input.
Canvas and Sound are also part of the view. They are triggered using events.
The dependencies between view, model and controller objects are kept to a minimum with 2 notable exceptions:
1) The size of the playing fields is communicated to the controller upon initialisation of the view.
2) Canvas depends on the Element object to be able to draw elements efficiently.

Decision: It was decided to place the timer in the controller (gameController) rather then in the view (snakeGame). Although the ticking of the timer can be seen as an event, gameController fully encapsulates its function. It did not seem justified to move it out of gameController and there was little benefit to use events on timer ticks.

Note: The use of text in the view is a bit clunky. This is an area of improvement. A configuration file to store the text and formatting would be ideal. This was not implemented due to time constraints.

# 3.1.2 Model
The model is split up into one module per object.
SnakeGameData is the main module. It contains Food and Snake and it offers a simple API to the gameController.
Snake and Food are independent of each other. They only depend on element.

# 3.1.3 Controller
gameController ties everything together. It provides a very generic API to the view which could be used for any game. It has a minimal awareness of the internal workings of the other modules, but enough to make it work together.
A good example separation and game-awareness is the keyPressed functionality which translates key events from the view into directions for the model.

Decision: It was decided to split off as much game specific functionality as possible and move it to snakeGameData to demonstrate the separation of generic and specific functionality. The goal is that the gameController API would support many different games. Level and timer considered generic and therefore part of the controller.

Decision: It was decided to trigger sound and canvas functionality on events only to demonstrate the use of events. The alternative is to store the required objects in the controller and let the controller call the correct function based on information of the model. This approach would not require any events, but it is against the javascript MVC model principles.  

Decision: It was decided to change the sound icon my manipulating the HTML class rather then a attribute like "active". This was not implemented due to priorities and time constraints.

# 3.2 General

Decision: It has been decided separate the playing grid from the pixel location. The X and Y coordinates used in the game refer to a grid number. The canvas module will determine how the grid needs to be drawn in pixels to fill the maximum canvas area. A rectangular canvas is also supported.

Decision: It has been decided to pass elements instead of x-y-coordinates. This was discussed during the lecture as a suitable solution to preserve information between canMove and doMove. The use of x-y-coordinates would not allow for the generic function indexOf in the Elements object.

Decision: It was decided to make the food and snake object very similar. Both are create as an empty object to which elements are added by the controller and both have a collision function.

Decision: It was decided to use add a convention to let private attributes (constants, variables and functions) begin with an underscore. This ensures the developer is more contentious of the context and it result in errors due to switching between private and public are caught sooner.

Note: The view has been updated with [Font Awesome](http://fontawesome.io/) so the buttons now contain icons instead of text.

Feature: Canvas Size. The canvas size can be changed to a rectangular (non-square) size. The game will adjust the size of the playing field and allow the snake to move over the entire field.

# 3.3 Documentation

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
14. ~~Util tests are executed, but no output is shown.~~ => deprecated
15. Get rid of the iFrame and use jQuery to load/display html content.
16. Add new game elements like: speed up/slow down/pause buttons, speed up automatically over time), add random walls or mole heaps, replace the food that's been eaten with new food (so the snake can grow even larger), move the remaining food to random locations, introduce superfood and some kind of scoring mechanism (with high scores table, but therefore we also need to identify the user).
17. Make better use of the requireJS library.
18. ...
