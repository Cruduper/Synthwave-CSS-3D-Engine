import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import mp3File from './audio/synthwaveCSSDemoSong.mp3';
import img from './img/sunset.png';

const root = document.documentElement;
const car = document.getElementById('car');
const carContainer = document.getElementById('carContainer');
const viewport = document.getElementById('viewport');
const scene = document.getElementById('scene')
const introScreen = document.getElementById('introScreen');
const floors = document.querySelectorAll('.floor');
const floorRate = getComputedStyle(root).getPropertyValue('--floorRate');
const floorBoostRate = getComputedStyle(root).getPropertyValue('--floorBoostRate');
const extraGlowRate = getComputedStyle(root).getPropertyValue('--extraGlowRate');
const extraGlowBoostRate = getComputedStyle(root).getPropertyValue('--extraGlowBoostRate');
const tireRotationRate = getComputedStyle(root).getPropertyValue('--tireRotationRate');
const tireRotationRateBoost = getComputedStyle(root).getPropertyValue('--tireRotationRateBoost');
const tireFrontLeft = document.getElementById('tireFrontLeft');
const tireFrontRight = document.getElementById('tireFrontRight');

let pressedKeys = {};
let done = false;
let keyPress;
let camAngle = 1;
let introEnterPressed = false;
let keysAllowed = false;
window.onkeyup = function(e) { pressedKeys[e.code] = false; logKey(e);}
window.onkeydown = function(e) { 
  if (pressedKeys[e.code] === false || pressedKeys[e.code] === undefined){
    pressedKeys[e.code] = true;
    logKey(e);
  }
}

function playSong() {
  const music = new Audio(mp3File);
  music.loop =false;
  music.playbackRate = 1;
  music.volume = 0.6;
  music.play();
}


function logKey(key) {

  keyPress = key;

  
  //console.log(key.code, introEnterPressed);
  if( keysAllowed === true){  
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
        //console.log("eco mode changed");
        // console.log(key);
        break;
      
      case 'ArrowLeft':
        if (key.type === "keydown"){
          car.classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          car.classList.add('carBodyTurnLeft')
          tireFrontLeft.className = "";
          tireFrontRight.className = "";
          tireFrontLeft.classList.add('leftTireTurnLeft');
          tireFrontRight.classList.add('rightTireTurnLeft');
        }
        else if (key.type === "keyup"){
          car.classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          car.classList.add('carBodyLeftToCenter')
          tireFrontLeft.className = "";
          tireFrontRight.className = "";
          tireFrontLeft.classList.add('leftTireLeftToCenter');
          tireFrontRight.classList.add('rightTireLeftToCenter');
        }
        window.requestAnimationFrame(step)
        break;
      case 'ArrowRight':
        if (key.type === "keydown"){
          car.classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          car.classList.add('carBodyTurnRight')
          tireFrontLeft.className = "";
          tireFrontRight.className = "";
          tireFrontLeft.classList.add('leftTireTurnRight');
          tireFrontRight.classList.add('rightTireTurnRight');
        }
        else if (key.type === "keyup"){
          car.classList.remove('carBodyTurnLeft', 'carBodyLeftToCenter', 'carBodyTurnRight', 'carBodyRightToCenter');
          car.classList.add('carBodyRightToCenter')
          tireFrontLeft.className = "";
          tireFrontRight.className = "";
          tireFrontLeft.classList.add('leftTireRightToCenter');
          tireFrontRight.classList.add('rightTireRightToCenter');
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
  else if (key.code === 'Enter'){
    if (introEnterPressed === false){
      console.log(key.code, introEnterPressed)
      introScreen.style.setProperty("display", "none");
      viewport.style.setProperty("display", "flex");
      car.classList.add('introAnimationCar');
      scene.classList.add('introAnimationCamera');
      introEnterPressed = true;
      playSong();
    }
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

  //console.log(currPosition + " || " + keyPress.code);

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



function addCameraSliders(){

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
}

$(document).ready(function() {
  const root = document.documentElement;
  

  
  addCameraSliders();

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


    //car.classList.add('introAnimationCar');
  });

  car.addEventListener("animationend", (event)=>{
    if(event.animationName === 'introAnimationCar'){
      car.classList.remove('introAnimationCar');
      keysAllowed = true;
    }
  });
})