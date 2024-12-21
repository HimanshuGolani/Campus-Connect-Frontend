// src/animations.js
import gsap from "gsap";

export const particleToTextAnim = (onComplete) => {
  const particles = document.querySelectorAll(".particle");
  const text = document.querySelector(".animated-text");

  gsap.timeline()
    .to(particles, {
      opacity: 1,
      duration: 1.5,
      stagger: 0.01,
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-50, 50),
    })
    .to(particles, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power4.out",
    })
    .to(
      text,
      {
        opacity: 1,
        duration: 1,
        onComplete,
      },
      "-=0.5"
    );
};

export const slideTextDown = (onComplete) => {
  gsap.to(".animated-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    onComplete,
  });
};

export const fadeInPage = () => {
  gsap.to(".main-content", {
    opacity: 1,
    duration: 1,
  });
};
