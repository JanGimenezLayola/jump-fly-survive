'use strict';

function main() {
  
  var mainElement = document.querySelector('#site-main')

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  };

  function createSplashScreen() {
    var splashScreen = buildDom(`
      <section class="splash"> 
      <head id="site-header">
        <video src="./images/final-title.mp4" autoplay loop muted></video>
      </head>
        <button class="start-button">Start</button>
      </section>
    `);

    var startButton = splashScreen.querySelector('.start-button');
    startButton.addEventListener('click', createInstructionsScreen);

  };

  function createInstructionsScreen() {
    var instructionsScreen = buildDom(`
      <section>
        <h1>Instructions</h1>
        <li>  
          <ol>Press Junp button</ol>
          <ol>Move with left and right keys</ol>
        </li>
        <button class="next">Next</button>
    `)

    var nextButton = instructionsScreen.querySelector('.next');
    nextButton.addEventListener('click', createGameScreen)
  }
  
  function createGameScreen() {
    var gameScreen = buildDom(`
      <section class="canvas">
        <canvas width="600" height="750"></canvas>
      </section>
      <section class="dificulty">
        <button class="start">EASY JUMP</button>
        <button class="hardcore">HARDCORE JUMP</button>
      </section>
    `);

    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);

    game.gameOverCallback(createGameOverScreen);

    game.startGame();

    document.addEventListener('keydown', function(event) {
      if(event.key === 'ArrowLeft') {
        game.skydiver.setDirection(-1);
      } else if (event.key === 'ArrowRight') {
        game.skydiver.setDirection(1);
      };

  });
  var button = document.querySelector('.start')
  button.addEventListener("click", function() {
    game.enemiesAppear();
    game.skyBackground.setStart(); 
  });

  var button = document.querySelector('.hardcore')
  button.addEventListener("click", function() {
    game.enemiesAppearHardcore();
    game.skyBackground.setStart(); 
  });
};


  function createGameOverScreen() {
    var gameOverScreen = buildDom(`
      <section class="gameover">
        <h1>Game Over</h1>
        <img class="eagle" src="./images/game-over-eagle.png">
        <button id="restart-button">Restart</button>
        <button id="menu-button">Menu</button>
      </section>
    `);  
    
    var restartButton = gameOverScreen.querySelector('#restart-button');
    restartButton.addEventListener('click', createGameScreen);

    var menuButton = gameOverScreen.querySelector('#menu-button');
    menuButton.addEventListener('click', createSplashScreen);

  };


  createSplashScreen();

};

window.addEventListener('load', main);