import gsap from "gsap";
import { easeSecondary } from "../utils/variables.js";

(() => {
  const links = document.querySelectorAll('[data-component="link-reveal"]');

  if (links.length <= 0) return;

  const projectList = document.querySelector("[data-projects-list]");
  let totalProjects = 0;

  if (projectList) totalProjects = projectList.childElementCount;

  const duration = 0.54;

  links.forEach((link) => {
    const textElements = link.querySelectorAll("[data-link-reveal='text']");
    link.addEventListener("mouseenter", () => animate(textElements, -100));
    link.addEventListener("mouseleave", () => animate(textElements, 0));

    const superscript = link.querySelector(
      "[data-link-reveal='project-count']",
    );
    if (superscript) {
      if (totalProjects > 0) {
        superscript.textContent = `(${totalProjects})`;
      } else {
        superscript.remove();
      }
    }
  });

  function animate(elements, yPercent) {
    gsap.to(elements, {
      yPercent: yPercent,
      duration: duration,
      ease: easeSecondary,
    });
  }
})();
