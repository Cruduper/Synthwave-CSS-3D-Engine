import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';



const root = document.documentElement;
const car = document.getElementById("car");
const carContainer = document.getElementById("carContainer");
const viewport = document.getElementById('viewport');
const floorRate = getComputedStyle(root).getPropertyValue('--floorRate');
const floorBoostRate = getComputedStyle(root).getPropertyValue('--floorBoostRate');
const extraGlowRate = getComputedStyle(root).getPropertyValue('--extraGlowRate');
const extraGlowBoostRate = getComputedStyle(root).getPropertyValue('--extraGlowBoostRate');
const tireRotationRate = getComputedStyle(root).getPropertyValue('--tireRotationRate');
const tireRotationRateBoost = getComputedStyle(root).getPropertyValue('--tireRotationRateBoost');
let pressedKeys = {};
let done = false;
let keyPress;
let camAngle = 1;
window.onkeyup = function(e) { pressedKeys[e.code] = false; logKey(e);}
window.onkeydown = function(e) { 
  if (pressedKeys[e.code] === false || pressedKeys[e.code] === undefined){
    pressedKeys[e.code] = true;
    logKey(e);
  }
}


function logKey(key) {

    keyPress = key;
    
    switch(key.code) {
      case 'KeyC':
        if (key.type === 'keydown'){
          camAngle++;
          if(camAngle === 1){ 
          setCameraAngle(-21, -10, 1, 0, 0, 15, 45, 12);
          document.querySelectorAll('.floor').forEach( function (elem) {
            elem.style.display = 'block';
          }); 
          }
          else if (camAngle === 2){
            setCameraAngle(-27, -6, -5, 0, 0, 13, 37, 17);
          }
          else if (camAngle === 3){
            setCameraAngle(-27, -13, -15, -30, 0, 11, 37, 13);
          }
          else if (camAngle === 4){
            setCameraAngle(-20, -3, 30, 0, 0, 17, 37, 17);
            document.querySelectorAll('.floor').forEach( function (elem) {
              elem.style.display = 'none';
            });
            camAngle = 0;
          }
        }
        break;
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

          document.querySelectorAll('#car .face').forEach( face => {
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
      
      case 'ArrowLeft':
        if (key.type === "keydown"){
          document.getElementById('car').classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          document.getElementById('car').classList.add('carBodyTurnLeft')
          document.getElementById('tireFrontLeft').className = "";
          document.getElementById('tireFrontRight').className = "";
          document.getElementById('tireFrontLeft').classList.add('leftTireTurnLeft');
          document.getElementById('tireFrontRight').classList.add('rightTireTurnLeft');
        }
        else if (key.type === "keyup"){
          document.getElementById('car').classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          document.getElementById('car').classList.add('carBodyLeftToCenter')
          document.getElementById('tireFrontLeft').className = "";
          document.getElementById('tireFrontRight').className = "";
          document.getElementById('tireFrontLeft').classList.add('leftTireLeftToCenter');
          document.getElementById('tireFrontRight').classList.add('rightTireLeftToCenter');
        }
        window.requestAnimationFrame(step)
        break;
      case 'ArrowRight':
        if (key.type === "keydown"){
          document.getElementById('car').classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          document.getElementById('car').classList.add('carBodyTurnRight')
          document.getElementById('tireFrontLeft').className = "";
          document.getElementById('tireFrontRight').className = "";
          document.getElementById('tireFrontLeft').classList.add('leftTireTurnRight');
          document.getElementById('tireFrontRight').classList.add('rightTireTurnRight');
        }
        else if (key.type === "keyup"){
          document.getElementById('car').classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          document.getElementById('car').classList.add('carBodyRightToCenter')
          document.getElementById('tireFrontLeft').className = "";
          document.getElementById('tireFrontRight').className = "";
          document.getElementById('tireFrontLeft').classList.add('leftTireRightToCenter');
          document.getElementById('tireFrontRight').classList.add('rightTireRightToCenter');
        }
        window.requestAnimationFrame(step)
        break;
        case 'ArrowUp':
        if (key.type === 'keydown'){
          carContainer.classList.add('boostCar');
          viewport.classList.add('boostScenePerspective');
          root.style.setProperty("--floorRate", floorBoostRate);
          root.style.setProperty("--extraGlowRate", extraGlowBoostRate );
          root.style.setProperty("--tireRotationRate", tireRotationRateBoost);
          
          document.querySelectorAll('.tire .face').forEach( face => {
            face.classList.add('boostCarGlow');
          });
        }
        break;
      default:
        // console.log("!");
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
}

function setCameraAngle(camDist, height, rotX, rotY, rotZ, perspect, perspectOrig, carDist){
  root.style.setProperty('--sceneDistance', camDist + "em");
  root.style.setProperty('--sceneHeight', height + "em");
  root.style.setProperty('--sceneRotateX', rotX + "deg");
  root.style.setProperty('--sceneRotateY', rotY + "deg");
  root.style.setProperty('--sceneRotateZ', rotZ + "deg");
  root.style.setProperty('--scenePerspective', perspect + "em");
  root.style.setProperty('--scenePerspectiveOrigin', perspectOrig + "%");
  root.style.setProperty('--carZShift', carDist + "em");
}



$(document).ready(function() {
  const root = document.documentElement;

  const slider = document.getElementById("angleSlider");
  slider.addEventListener("input", (e) => {
    root.style.setProperty("--sceneRotateY", e.target.value + "deg");
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


  carContainer.addEventListener("animationend", (event)=>{
    if(event.animationName === 'boostCar'){
      car.classList.remove('carBodyRightToCenter', 'carBodyLeftToCenter');
      carContainer.classList.remove('boostCar');

      viewport.classList.remove('boostScenePerspective');
      car.querySelectorAll('.tire .face').forEach( face => {
        face.classList.remove('boostCarGlow');
      });

      root.style.setProperty("--floorRate", floorRate);
      root.style.setProperty("--extraGlowRate", extraGlowRate);
      root.style.setProperty("--tireRotationRate", tireRotationRate);
    }
  });
})