export function isMobileDevice() {
  return (
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) ||
    (window.innerWidth <= 768 && window.innerHeight <= 1024)
  );
}
