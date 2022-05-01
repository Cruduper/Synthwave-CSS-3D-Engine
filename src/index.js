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

});