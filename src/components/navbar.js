import gsap from "gsap";
import { lenis } from "./lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeSecondary } from "../utils/variables";

gsap.registerPlugin(ScrollTrigger);

(() => {
  const navbar = document.querySelector("[data-component='navbar']");
  if (!navbar) return;

  const logo = navbar.querySelector("[data-navbar='logo-link']");
  const menu = navbar.querySelector("[data-navbar='menu']").children;
  const button = navbar.querySelector(".navbar-button_component");
  const menuButtonWrapper = navbar.querySelector(
    "[data-navbar='menu-button']",
  ).parentElement;

  let visibleElements = [];
  visibleElements =
    window.innerWidth > 991
      ? [logo, ...menu, button]
      : [logo, button, menuButtonWrapper];

  animateNavbar(visibleElements);

  const blendModeSections = document.querySelectorAll(
    "[data-navbar-blend-mode='false']",
  );
  if (blendModeSections.length) {
    const navbarHeight = navbar.offsetHeight;

    const setNormal = () => gsap.set(navbar, { mixBlendMode: "normal" });
    const setDifference = () =>
      gsap.set(navbar, { mixBlendMode: "difference" });

    blendModeSections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top-=${navbarHeight / 2} top`,
        end: `bottom top+=${navbarHeight / 2}`,
        onEnter: setNormal,
        onEnterBack: setNormal,
        onLeave: setDifference,
        onLeaveBack: setDifference,
      });
    });
  }

  let navOverlay;
  const intervalId = setInterval(() => {
    navOverlay = document.querySelector(".w-nav-overlay");
    if (navOverlay) {
      clearInterval(intervalId);
      navOverlay.addEventListener("click", () => {
        lenis.start();
        ScrollTrigger.refresh();
        setTimeout(() => {
          gsap.set(navbar, { mixBlendMode: "difference" });
        }, 250);
      });
    }
  }, 100);

  menuButtonWrapper.addEventListener("click", () => {
    // const inlineBlendMode = navbar.style.mixBlendMode;

    if (lenis.isStopped) {
      lenis.start();
      ScrollTrigger.refresh();
      setTimeout(() => {
        gsap.set(navbar, { mixBlendMode: "difference" });
      }, 250);
    } else {
      lenis.stop();
      gsap.set(navbar, { mixBlendMode: "normal" });
    }
  });

  function animateNavbar(elements) {
    let delay = 0;
    if (window.location.pathname === "/") {
      delay = 3.5;
    }
    gsap.set(navbar, { autoAlpha: 1 });
    gsap.set(elements, {
      y: "-5rem",
    });
    gsap.to(elements, {
      y: 0,
      duration: 1,
      delay: delay,
      stagger: 0.05,
      ease: easeSecondary,
    });
  }
})();
