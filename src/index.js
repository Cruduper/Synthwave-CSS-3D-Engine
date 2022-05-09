import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';



const root = document.documentElement;
//let start;
let pressedKeys = {};
let done = false; //let previousTimeStamp; //const element = document.getElementById('cyberCraft'); ;
let keyPress;



function logKey(key) {

    keyPress = key;
    

    switch(key.code) {
      case 'KeyE':
        if (key.type === 'keydown')
        {
          document.querySelectorAll('.horLine > th').forEach( box => {
            box.classList.toggle('vertLine');
          });
        
          let exGlowVis = document.querySelector('#floorExtraGlow');
          let disp = window.getComputedStyle(exGlowVis, null).display;
          if (disp === "block"){
            exGlowVis.style.display = "none";
          } else {
            exGlowVis.style.display = "block";
          }

          document.querySelectorAll('#cyberCraft .face').forEach( face => {
            face.classList.toggle('playerColor');
          });
          document.querySelectorAll("#palmTree [class*='prism']").forEach(face => {
            face.classList.toggle("leafColor");
          });
          document.querySelectorAll("#palmTree [class*='cylinder']").forEach(face => {
            face.classList.toggle("trunkColor");
          });
        }
        console.log("eco mode changed");
        // console.log(key);
        break;
      case 'KeyA':
        break;
      case 'ArrowLeft':
        if (key.type === "keydown"){
          document.getElementById('tireFrontLeft').classList.remove('leftTireLeftToCenter');
          document.getElementById('tireFrontRight').classList.remove('rightTireLeftToCenter');
          document.getElementById('tireFrontLeft').classList.add('leftTireTurnLeft');
          document.getElementById('tireFrontRight').classList.add('rightTireTurnLeft');
        }
        else if (key.type === "keyup"){
          document.getElementById('tireFrontLeft').classList.remove('leftTireTurnLeft');
          document.getElementById('tireFrontRight').classList.remove('rightTireTurnLeft');
          document.getElementById('tireFrontLeft').classList.add('leftTireLeftToCenter');
          document.getElementById('tireFrontRight').classList.add('rightTireLeftToCenter');
        }
        window.requestAnimationFrame(step)
        break;
      case 'ArrowRight':

        window.requestAnimationFrame(step)
        break;
      default:
        // console.log("!");
    }
}




window.onkeyup = function(e) { pressedKeys[e.code] = false; logKey(e);}
window.onkeydown = function(e) { 
  if (pressedKeys[e.code] === false || pressedKeys[e.code] === undefined){
    pressedKeys[e.code] = true;
    logKey(e);
  }

  
}

function step(){
  //const elapsed = timestamp - start;
  let playerMove; 
  let otherKeyPressed = false;
  const stepIncrement = 2;
  const lateralBound = 50;
  const currPosition = parseInt( getComputedStyle(document.documentElement).getPropertyValue('--playerLeftRight') );
  
  if ( keyPress.code === 'ArrowLeft' && pressedKeys['ArrowRight'] != true){
      playerMove = Math.max(currPosition - stepIncrement, -1 * lateralBound); //(-0.1 * elapsed)    
  } 
  else if ( keyPress.code === 'ArrowRight'  && pressedKeys['ArrowLeft'] != true){
      playerMove = Math.min(currPosition + stepIncrement, lateralBound);
  }
  else {
    otherKeyPressed = true;
    playerMove = currPosition;
  }

  console.log(currPosition + " || " + keyPress.code);

  if (otherKeyPressed === false){
    root.style.setProperty('--playerLeftRight', playerMove + "em");
    
    if (playerMove === -1 * lateralBound || playerMove === lateralBound) done = true;

    if (pressedKeys[keyPress.code] === true ){
      !done && window.requestAnimationFrame(step);
    } 
    else if ( pressedKeys[keyPress.code] === false ) {
      done = false;
    } 
  }
  // else  {
  //   window.requestAnimationFrame(step);
  // }

  // if (pressedKeys[key.code] === true) {
  //   Math.min() is used here to make sure the element stops at exactly 200px
  //   const count = -1 //Math.max(-1 * elapsed, -50);
  //   element.style.transform = 'translateX(' + count + 'px)';
  //   root.style.setProperty('--playerLeftRight', (currPosition + count) + "em");
    
  // }

  // if (pressedKeys[key.code] === false) { // Stop the animation after 2 seconds
  //   previousTimeStamp = timestamp
  //   \!done && window.requestAnimationFrame(() => { step( Date.now(), key)});
  // }
}


// function animateCar(key){
//   switch (key.code) {
//     case 'ArrowLeft':

//       if (key.type === "keydown"){
//         document.getElementById('tireFrontLeft').addClass('leftTireTurnLeft');
//       }
//       else if (key.type === "keyup"){
//         document.getElementById('tireFrontRight').addClass('rightTireTurnLeft');
//       }
//       break;
//     default:
//       break;
//   }
// }





$(document).ready(function() {
  const root = document.documentElement;

  const slider = document.getElementById("angleSlider");
  slider.addEventListener("input", (e) => {
    root.style.setProperty("--sceneRotate", e.target.value + "deg");
  });
  const slider2 = document.getElementById("leftRightSlider");
  slider2.addEventListener("input", (e) => {
    root.style.setProperty("--sceneLeftRight", e.target.value + "em");
  });
  const slider3 = document.getElementById("playerleftRightSlider");
  slider3.addEventListener("input", (e) => {
    root.style.setProperty("--playerLeftRight", e.target.value + "em");
  });
  const slider4 = document.getElementById("distanceSlider");
  slider4.addEventListener("input", (e) => {
    root.style.setProperty("--sceneDistance", e.target.value + "em");
  });
});
