import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { duration, staggerAmount, easePrimary } from "../utils/variables.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.fonts.ready.then(() => {
  const texts = document.querySelectorAll("[data-split-text='true']");

  texts.forEach((el) => {
    el.innerHTML = el.innerHTML.replace(/\n/g, "<br>");
  });

  SplitText.create(texts, {
    // autoSplit: true,
    type: "lines",
    mask: "lines",
    linesClass: "line",
    prepareText: (text, el) => {
      let indent = el.dataset.indent || "";
      if (!indent) return text;

      // Fill missing values with the last available value
      let parts = indent.split(",").map(Number);
      while (parts.length < 4) {
        parts.push(parts[parts.length - 1]);
      }

      const [desktop, tablet, landscape, portrait] = parts;
      const breakpoints = { desktop, tablet, landscape, portrait };

      // Select indent key by viewport width
      let key;
      if (window.innerWidth > 991) key = "desktop";
      else if (window.innerWidth > 767) key = "tablet";
      else if (window.innerWidth > 479) key = "landscape";
      else key = "portrait";

      const spaces = "\u00A0".repeat(breakpoints[key]);
      return spaces + text;
    },
  });

  texts.forEach((textElement) => {
    if (textElement.dataset.autoplay !== "true") return;

    const delay = Number(textElement.dataset.delay) / 1000 || 0;
    const lines = textElement.querySelectorAll(".line");

    gsap.set(textElement, { autoAlpha: 1 });

    const tl = gsap.timeline({ paused: true });
    tl.from(lines, {
      yPercent: 100,
      duration,
      ease: easePrimary,
      stagger: { amount: staggerAmount },
      delay,
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: textElement,
      start: "0% 100%",
      toggleActions: "play none none reset",
    });
  });
});
