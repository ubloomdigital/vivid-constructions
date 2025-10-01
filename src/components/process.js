(() => {
  const component = document.querySelector("[data-component='process']");
  if (!component) return;

  const indexesWrapper = component.querySelectorAll(
    "[data-process='index-wrapper']",
  );

  if (!indexesWrapper) return;

  indexesWrapper.forEach((indexWrapper) => {
    const textElement = indexWrapper.querySelector("p");
    if (!textElement) return;
    textElement.textContent = textElement.textContent.padStart(2, "0");
  });
})();
