import gsap from "gsap";
import { easeSecondary } from "../utils/variables.js";

(() => {
  const component = document.querySelectorAll("[data-image-reveal]");
  if (component.length === 0) return;

  component.forEach((wrapper) => {
    const image = wrapper.querySelector("img");
    const blind = wrapper.querySelector("[data-image-blind]");

    gsap.set(image, { scale: 1.05 });

    const reveal = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    if (blind) {
      reveal.to(blind, {
        opacity: 0,
        duration: 0.6,
      });
      reveal.to(
        image,
        {
          scale: 1,
          duration: 1.2,
          ease: easeSecondary,
        },
        0,
      );
    }
  });
})();
