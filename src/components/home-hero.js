import gsap from "gsap";
import { lenis } from "./lenis.js";
import { duration, staggerAmount, easePrimary } from "../utils/variables.js";
import { isMobileDevice } from "../utils/functions.js";

(() => {
  const component = document.querySelector("[data-component='home-hero']");
  if (!component) return;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (isMobileDevice()) {
    gsap.set(component, { height: window.innerHeight });
  }

  setTimeout(() => {
    lenis.scrollTo(0, { duration: 0.01, force: true });
  }, 100);

  const curtain = component.querySelector("[data-home-hero='curtain']");
  const logo = component.querySelector("[data-home-hero='logo']");
  const number = component.querySelector("[data-home-hero='number']");
  const bar = component.querySelector("[data-home-hero='bar']");
  const image = component.querySelector("[data-home-hero='background-image']");
  const texts = component.querySelectorAll("p");

  const loadingSteps = [
    { progress: 66, duration: 1.5, ease: "power1.in" },
    { progress: 100, duration: 0.6, ease: "power1.in" },
  ];

  // Animate logo
  gsap.set(logo, { autoAlpha: 1 });
  gsap.fromTo(
    logo,
    { clipPath: "inset(0% 100% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
  );

  // Animate number and bar in sync
  const animateNumber = (target, steps) => {
    const tl = gsap.timeline();
    steps.forEach((step) => {
      tl.to(target, {
        textContent: step.progress,
        duration: step.duration,
        ease: step.ease,
        snap: { textContent: 1 },
        onUpdate() {
          target.textContent = Math.round(this.targets()[0].textContent);
        },
      });
    });
    return tl;
  };

  const animateBar = (target, steps, onComplete) => {
    const tl = gsap.timeline({ onComplete });
    steps.forEach((step) => {
      tl.to(target, {
        width: `${step.progress}%`,
        duration: step.duration,
        ease: step.ease,
      });
    });
    return tl;
  };

  // Curtain timeline (paused)
  const curtainTL = gsap.timeline({ paused: true }).to(curtain, {
    clipPath: "inset(0% 0% 100% 0%)",
    ease: "power4.out",
    duration: 2,
  });

  // Background image timeline (paused)
  const imageTL = gsap.timeline({ paused: true });
  imageTL.from(image, {
    scale: 1.05,
    webkitFilter: `blur(5px)`,
    filter: `blur(5px)`,
    ease: "power3.inOut",
    duration: 1.5,
  });

  // Animate texts after image animation starts
  imageTL.add(() => {
    texts.forEach((text, i) => {
      const lines = text.querySelectorAll(".line");
      gsap.set(text, { autoAlpha: 1 });
      gsap.timeline({ delay: i * 0.3 }).from(lines, {
        yPercent: 100,
        duration,
        ease: easePrimary,
        stagger: { amount: staggerAmount },
      });
    });
  }, imageTL.duration() * 0.5);

  // Start number and bar animations, then play curtain and image
  animateNumber(number, loadingSteps);
  animateBar(bar, loadingSteps, () => {
    curtainTL.play();
    imageTL.play();
  });
})();
