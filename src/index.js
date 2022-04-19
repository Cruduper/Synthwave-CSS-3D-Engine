import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {

  const slider = document.getElementById("slider");
  const root = document.documentElement;

  slider.addEventListener("input", (e) => {
    root.style.setProperty("--sceneRotate", e.target.value + "deg");
  });

});