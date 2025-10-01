import gsap from "gsap";

(() => {
  const component = document.querySelector("[data-custom-cursor]");

  if (!component || !window.matchMedia("(pointer: fine)").matches) return;

  gsap.set(component, { autoAlpha: 0, scale: 0 });

  var cursorTriggers = document.querySelectorAll(
    "[data-custom-cursor-trigger]",
  );
  var cursorWidth = component.offsetWidth;
  var cursorHeight = component.offsetHeight;

  var watchCursor = function watchCursor(e) {
    var x = e.clientX;
    var y = e.clientY;
    component.style.left = x - cursorWidth / 2 + "px";
    component.style.top = y - cursorHeight / 2 + "px";
  };
  document.addEventListener("pointermove", watchCursor);

  let hideTween;

  cursorTriggers.forEach(function (trigger) {
    trigger.addEventListener("mouseenter", function () {
      // kill pending hide tween if exists
      if (hideTween) {
        hideTween.kill();
        hideTween = null;
      }
      gsap.set(trigger.querySelectorAll("*"), { cursor: "none" });
      gsap.set(component, { autoAlpha: 1 });
      gsap.to(component, {
        scale: 1,
        duration: 0.2,
      });
    });

    trigger.addEventListener("mouseleave", function () {
      gsap.set("*", { clearProps: "cursor" });
      hideTween = gsap.to(component, {
        scale: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(component, { autoAlpha: 0 });
          hideTween = null;
        },
      });
    });
  });
})();
