(() => {
  document.querySelectorAll("[data-join]").forEach((wrapper) => {
    const sep = wrapper.getAttribute("data-join");
    const children = Array.from(wrapper.children);

    if (children.length > 1) {
      const first = children[0];
      const joined = children.map((el) => el.textContent.trim()).join(sep);
      first.textContent = joined;
      children.slice(1).forEach((el) => el.remove());
    }
  });
})();
