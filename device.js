/**
 * Marks real phone-like devices so the simplified mobile UI is not tied only
 * to a narrow desktop window.
 */
(function () {
  function isPhoneDevice() {
    const ua = navigator.userAgent || "";
    const hasTouch = navigator.maxTouchPoints > 0;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrowViewport = window.matchMedia("(max-width: 768px)").matches;
    const smallScreen = Math.min(window.screen.width, window.screen.height) <= 820;
    const mobileUa = /Android.*Mobile|iPhone|iPod|Windows Phone|IEMobile|Opera Mini|Mobile/i.test(ua);

    return mobileUa || (hasTouch && coarsePointer && narrowViewport && smallScreen);
  }

  function updateDeviceClass() {
    document.documentElement.classList.toggle("phone-device", isPhoneDevice());
  }

  updateDeviceClass();
  window.addEventListener("resize", updateDeviceClass);
  window.addEventListener("orientationchange", updateDeviceClass);
})();
