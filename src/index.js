import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';





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

  document.addEventListener('keydown', logKey);
  console.log(logKey);
  function logKey(key) {
    switch(key.code) {
      case 'KeyE':
      {
        document.querySelectorAll('.horLine > th').forEach( box => {
          box.classList.toggle('vertLine');
        });
      
        let exGlowVis = document.querySelector('#floorExtraGlow');
        let disp = window.getComputedStyle(exGlowVis, null).display;
        if (disp === "block"){
          exGlowVis.style.display = "none";
        }
        else {
          exGlowVis.style.display = "block";
        }
        //console.log("extraGlow display: " + window.getComputedStyle(exGlowVis, null).display);
        

        document.querySelectorAll('#cyberCraft .face').forEach( face => {
          face.classList.toggle('playerColor');
        });
      }
      console.log("eco mode changed");
        break;
      default:
        console.log("!");
    }
  }

  
  // document.getElementById("div1").classList.add("classToBeAdded");
  // document.getElementById("div1").classList.remove("classToBeRemoved");


});