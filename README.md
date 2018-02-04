# Introduction

This repository contains code for the Open University course: Webapplicaties: de clientkant (Webapplications: the client side)

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

# 3.1.1. View
The HTML of assignment 1 acts as the view.

# 3.1.2 Controller
The Controller is split up into 3 modules. 
SnakeGame is responsible for loading all the required classes, DOM interaction and events. 

GameController is responsible for the basic operations of the game. This includes controlling the snakeController, Sound and Canvas. 

Decision: It was decided to split up the controller into several files/modules to demonstrate the separation of generic and specific functionality. The result was separation of DOM Interaction & events, generic game mechanics (start, stop, etc) and specific game mechanics (snake, canvas & sound). 

Decision: It was decided to trigger sounds on events to demonstrate the use of events. The alternative is to store the required information in the model (eat, move, gameover, gamewin, etc), let the controller check the model and trigger the corrisponding function in sound. 

Decision: It was decided to change the sound icon in the controller rather then the view. It would have been better to include let the CSS change the icon based on an "active" state set by the controller. This was not implemented due to priorities and time constraints. 

# 3.2 General

Some additional features:
CANVAS SIZE: 
The canvas size can be changed to a rectangular (non-square) size. The game will adjust the size of the playing field and allow the snake to move over the entire field. 

Decision: It was decided to use add a convention to let private attributes (constants, variables and functions) begin with an underscore. This ensures the developer is more contentious of the context and it result in errors due to switching between private and public are caught sooner.  

 in a single controller module which retrieves the canvas from the view, listens for user input and draws the result bases on the state of the game.

The model is split up in several parts: sound, canvas and game objects.
Element, Food, Snake and Canvas are the core models for this application. They are structured according to the object model pattern which is a specific form of the model pattern with a single object per module. The objects are structured strictly hierarchical. Food, Snake and Canvas use Element, but no other dependencies exist between the models.
The Sound module has been added with the same object model pattern. It is completely independent of other modules.
Util acts as as a library of functions. The module structure does not provide any benefits here, so it was decided to format it as a plain javascript library.



In order to play the game a controller class is created which controls the view (DOM, UI, HTML) and communicates with the model to instantiate the required objects.

The view has been updated with [Font Awesome](http://fontawesome.io/) so the buttons now contain icons instead of text.

Design decisions:
It has been decided separate the playing grid from the pixel location. The X and Y coordinates used in the game refer to a grid number. The canvas module will determine how the grid needs to be drawn in pixels to fill the maximum canvas area. A rectangular canvas is also supported.

It has been decided to pass x and y coordinates instead of an element. This was discussed during the lecture as a suitable alternative from recreating objects for the purpose of canMove, doMove and collision. It is also considered more intuitively correct to move to a coordinate rather then to an element. As a result, the dependency between the controller and elements object is reduced.

It was decided to make the food and snake object very similar. Both are create as an empty object, both have an add function to add new elements and both have a collision function to test for existing elements.

It has been decided to move the indexOf function to the util library. Although it depends on Element and therefore might not belong in a functional library, the function is reused by both food and snake. It was preferred to keep food and snake independent of each other.


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
16. Add new game elements like: speed up/slow down/pause buttons, speed up automatically over time), add random walls or mole heaps, replace the food that's been eaten with new food (so the snake can grow even larger), move the remaining food to random locations, introduce superfood and some kind of scoring mechanism (with high scores table, but therefore we also need to identify the user).
17. ...
