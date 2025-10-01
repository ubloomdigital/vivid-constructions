import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

(() => {
  const component = document.querySelector("[data-component='projects-mask']");
  if (!component) return;

  const projects = component.querySelectorAll("[data-projects-mask='item']");
  const projectsAmmount = projects.length;

  const getStableVH = () => {
    if (window.visualViewport) {
      return Math.max(window.visualViewport.height, window.innerHeight);
    }
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  };

  let localTriggers = [];

  const init = () => {
    localTriggers.forEach((t) => t.kill());
    localTriggers = [];

    const windowHeight = getStableVH();
    component.style.height = `${projectsAmmount * windowHeight}px`;

    projects.forEach((project, i) => {
      const projectOffsetY = (i - 1) * windowHeight;
      gsap.set(project, { zIndex: i + 1 });

      if (i !== 0) {
        const tween = gsap.fromTo(
          project,
          {
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: `bottom+=${projectOffsetY} bottom`,
              end: `bottom+=${projectOffsetY} top`,
              scrub: true,
            },
          },
        );
        localTriggers.push(tween.scrollTrigger);
      }
    });
    ScrollTrigger.refresh();
  };

  init();

  window.addEventListener("resize", () => {
    init();
  });
})();
