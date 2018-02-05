# Introduction

This repository contains code for the Open University course: Webapplicaties: de clientkant (Web applications: the client side)

The result: [The Game Site](index.html) or [The Snake Game](snake.html)

### Collaborators:

* Aart Pelt (a.j.w.pelt@gmail.com)
* Onno Huijgen (o.huijgen@gmail.com)

       ---_ ......._-_--.
      (|\ /      / /| \  \
      /  /     .'  -=-'   `.
     /  /    .'             )
   _/  /   .'        _.)   /
  / o   o        _.-' /  .'
  \          _.-'    / .'*|
   \______.-'//    .'.' \*|
    \|  \ | //   .'.' _ |*|
     `   \|//  .'.'_ _ _|*|
      .  .// .'.' | _ _ \*|
      \`-|\_/ /    \ _ _ \*\
       `/'\__/      \ _ _ \*\
      /^|            \ _ _ \*
     '  `             \ _ _ \   
                       \_

== figure 1: snake ==
                       
###################
# 1. Assignment 1 #
###################

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

###################
# 1. Assignment 2 #
###################

This part focusses on Javascript. In order to let the code be tested by the instructor the requirements have to be met precisely.

The functions collidesWithOneOf and canMove/doMove are added as methods to Element and Snake respectively.

In order to determine the new position of the snake's head the method Snake.createNewHead was added. This method is now called both in canMove as doMove. It would be better if canMove returned a segment (type Element) if movement is possible. The doMove modify the snake segments.

An attempt was made to execute the tests from the command line using mocha/chai. Because of the difference in coding for the browser and coding for node, you would need something like **browserify** and a build system in place. Because this falls outside the scope of this course, tests are executed from a webpage.

###################
# 1. Assignment 3 #
###################

In this part the code is refactored into modules. The model, view and controller are separated and additional functionality is implemented to complete the game.

# 3.1. General

GAME GRID
The game was refactored to use coordinates based on step-size rather then pixel-size. As a result, the snake makes steps of 1. The canvas will ensure the game is drawn to the right proportions for reasonably sized canvas. A rectangular canvas is also supported.

LEVELS
Upon completing a level, the player can start the next level which is more difficult. There is more food to eat, the snake is longer and it moves faster. If the snake is too long to fit on the board in it's start position, it will coil up it's tail on the edge of the field. Snakes are clever creatures...

SOUND
Sound effects have been added. Sound can be enabled and disabled using a button. The use of sound helps the player time tight corners at higher levels. Snakes normally don't make a lot of sound unless you feed them apples.

WALLS
Walls have been added to the game to make it more interesting. 

# 3.2. Architecture

The application follows the MVC architecture pattern.

VIEW
The view is responsible for DOM interaction (including canvas and sound) and events (buttons, keys and custom events). It interacts with the controller.

CONTROLLER
The controller handles the responses to events by interacting with the model. The controller may not directly interact with the view.

MODEL
The model is used to store data onto objects. These objects are ignorant to a wider context. The model may not directly interact with the view or controller.

most modules are structured according to the "object model pattern" which is a specific form of the model pattern. It has a single object per module. As a result, the view and model consist of a main module with respectively 2 and 3 additional (largely independent) modules. 


                                        ++++++++++
                                        + Sound  +
                ++++++++++++++++++  ->  ++++++++++
View        ..> + SnakeGame      +    
            .   ++++++++++++++++++  ->  ++++++++++
            .          |                + Canvas +
===         .          V                ++++++++++
            .   ++++++++++++++++++            |
Controller  .   + gameController +            |
            .   ++++++++++++++++++            |
===         .          |                      |
            .          V                      |
            .   ++++++++++++++++++            |
            ....+ SnakeGameData  +---------|  |
                ++++++++++++++++++         |  |
Model               |         |            |  |
                    V         V            |  |
                +++++++++ ++++++++         |  |
                + Snake + + Food +         V  V
                +++++++++ ++++++++  ->  +++++++++++
                    |                   + Element +
                    ----------------->  +++++++++++
 
== figure 2: simplified class diagram of snake game == 

# 3.2.1. View

SNAKEGAME
snakeGame is the main view module. It is responsible for loading all required modules and creating the controller, sound and canvas afterwards. It also handles all events and key input. Generic game events are by the controller and model to trigger the view. SnakeGame determines which view functions need to be trigger as a response. 

Decision: It was decided to load all modules in snakeGame. This ensured the objects were created after all code was loaded and it allowed for an easier test framework.

Improvement: The text is currently hard coded. It would better to store the text in a configuration file. This was not implemented due to time constraints. 

CANVAS
Canvas is used to draw elements and text. Upon creation of the canvas, the grid-size is determined based on the available canvas. This is then used to setup the game. Rectangular shapes of any size between 100 and 1000 pixels is support. The draw functionality is triggered indirectly by the controller or the model using generic game events. 

Decision: It was decided to make Canvas aware of the Element object so it would be able to draw elements efficiently. 

SOUND
Sound is used to make sound as the name suggests. Sounds are triggered by the controller of the model using the same generic game events as for canvas. 

Decision: It was decided to handle the sound toggling in the view. There seemed little benefit of involving the controller and this way, the controller does not need to be aware of the existence of sound which further decouples the two components.


# 3.2.2 Controller

GAMECONTROLLER
gameController ties everything together. It provides a very generic API to the view which could be used for any game. The timer is encapsulated in the controller. Generic functions such as start, stop and keyPressed are interpreted based on the current state of the game after which the timer and/or model are updated. 

Decision: It was decided to split off as much game specific functionality as possible and move it to snakeGameData to demonstrate the separation of generic and game-specific functionality. The goal is that the gameController API would support many different games. Level and timer considered generic and therefore part of the controller. 

Decision: It was decided to place the timer in the controller (gameController) rather then in the view (snakeGame). Although the ticking of the timer can be seen as an event, gameController fully encapsulates its function. It did not seem justified to move it out of gameController or to use events on timer ticks.

# 3.2.2 Model

SNAKEGAMEDATA
much of the snake specific functionality has been moved to the snakeGameData object. It offers a very simple API to GameController. GameController has a minimal awareness of the internal workings this modules and no awareness of other model modules. A example of the intended separation is the translation of keyPressed functionality into directions. 

SNAKE
This module contains the snake. The snake is created and moved by SnakeGameData. Snake is not aware of any game mechanics. It creates a new head, checks if the move is valid and then adds it to snake. 

FOOD
This module contains the food. Food is created and maintained by SnakeGameData. Food is not aware of any game mechanics. Food is first created separately, checked if it collides with any existing element and then added to food.

# 3.3 General

Decision: It has been decided to pass elements instead of x-y-coordinates. This was discussed during the lecture as a suitable solution to preserve information between canMove and doMove. The use of x-y-coordinates would not allow for the generic function indexOf in the Elements object. 

Decision: It was decided to use add a convention to let private attributes (constants, variables and functions) begin with an underscore. This ensures the developer is more contentious of the context and it result in errors due to switching between private and public are caught sooner.

Note: The view has been updated with [Font Awesome](http://fontawesome.io/) so the buttons now contain icons instead of text.

# 3.4 Documentation

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
