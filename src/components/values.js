import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easePrimary } from "../utils/variables.js";

gsap.registerPlugin(ScrollTrigger);

(() => {
  const component = document.querySelector("[data-component='values']");

  if (!component) return;

  const imagesWrapper = component.querySelectorAll(
    "[data-values='image-wrapper']",
  );
  const buttons = component.querySelectorAll("[data-values='button']");
  const descriptions = component.querySelectorAll(
    "[data-values='description']",
  );

  if (!imagesWrapper || !buttons || !descriptions) return;

  const duration = 1;
  let zIndex = 0;

  initSetup();

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      triggerTab(id);
    });
  });
  ScrollTrigger.create({
    trigger: buttons[0],
    start: "top bottom",
    onEnter: () => buttons[0].click(),
  });

  function triggerTab(id) {
    const currentlyActiveButton = [...buttons].find((el) =>
      el.classList.contains("is-active"),
    );
    let currentlyActiveId = null;
    if (currentlyActiveButton) {
      currentlyActiveId = currentlyActiveButton.dataset.id;
    }

    const button = getById(buttons, id);

    if (button.classList.contains("is-active")) return;

    const imageWrapper = getById(imagesWrapper, id);
    const description = getById(descriptions, id);

    if (currentlyActiveId) removeActive(currentlyActiveId);
    setActive(button, imageWrapper, description);
  }

  function initSetup() {
    buttons.forEach((button, i) => {
      button.classList.remove("is-active");
      const index = button.querySelector(
        "[data-values='button-index-wrapper']",
      );
      if (!index) return;
      const textElement = index.querySelector("p");
      if (!textElement) return;
      textElement.textContent = `(${textElement.textContent.padStart(2, "0")})`;
    });

    gsap.set(imagesWrapper, { clipPath: "inset(100% 0% 0% 0%)" });

    gsap.set(descriptions, {
      yPercent: 50,
      autoAlpha: 0,
    });

    //add index format on mobile
    const indexesMobile = document.querySelectorAll(
      "[data-value-index-mobile]",
    );
    indexesMobile.forEach((index) => {
      const textElement = index.firstChild;
      textElement.textContent = `(${textElement.textContent.padStart(2, "0")})`;
    });
  }

  function getById(nodelist, id) {
    return [...nodelist].find((el) => el.dataset.id === id);
  }

  function setActive(button, imageWrapper, description) {
    button.classList.add("is-active");
    zIndex++;
    gsap.set(imageWrapper, { zIndex });
    gsap.fromTo(
      imageWrapper,
      {
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: easePrimary,
        duration,
      },
    );
    gsap.fromTo(
      description,
      {
        yPercent: 50,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration,
        ease: easePrimary,
      },
    );
  }

  function removeActive(id) {
    const button = getById(buttons, id);
    const imageWrapper = getById(imagesWrapper, id);
    const description = getById(descriptions, id);

    button.classList.remove("is-active");
    // gsap.set(imageWrapper, { zIndex: 0 })
    gsap.to(description, {
      yPercent: -50,
      autoAlpha: 0,
      duration,
      ease: easePrimary,
    });
  }
})();
