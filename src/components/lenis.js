// lenis.js
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis();

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

lenis.on("scroll", () => {
  ScrollTrigger.update();
});
