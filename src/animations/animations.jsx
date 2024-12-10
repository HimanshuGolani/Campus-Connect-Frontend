// src/animations.js
import gsap from "gsap";

// Function for preloader animation
export const preLoaderAnim = () => {
  gsap.fromTo(
    ".preloader", 
    { opacity: 1 }, 
    { opacity: 0, duration: 1, onComplete: () => document.querySelector(".preloader").style.display = "none" }
  );
};

// Function to open the menu (hamburger menu animation)
export const openMenu = () => {
  gsap.to(".hamburger-menu", { opacity: 1, x: 0, duration: 0.5 });
};

// Function to close the menu
export const closeMenu = () => {
  gsap.to(".hamburger-menu", { opacity: 0, x: -200, duration: 0.5 });
};

// Fade in effect
export const fadeIn = (element) => {
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
};

export const fadeOut = (element) => {
  gsap.to(element, { opacity: 0, duration: 1 });
};


