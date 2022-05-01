import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {

  const slider = document.getElementById("angleSlider");
  const root = document.documentElement;

  slider.addEventListener("input", (e) => {
    root.style.setProperty("--sceneRotate", e.target.value + "deg");
  });

  const slider2 = document.getElementById("leftRightSlider");

  slider2.addEventListener("input", (e) => {
    root.style.setProperty("--sceneLeftRight", e.target.value + "em");
  });

});