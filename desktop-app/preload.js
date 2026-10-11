const { contextBridge } = require("electron");

const DESKTOP_AUTH_SECRET = "ESP_SECURE_DESKTOP_TOKEN_2026_9f8d1c7a4b";

contextBridge.exposeInMainWorld("ecomDesktop", {
  isDesktop: true,
  token: DESKTOP_AUTH_SECRET,
  version: "3.0.0",
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    sessionStorage.setItem("ecom_speed_pro_desktop_token", DESKTOP_AUTH_SECRET);
    localStorage.setItem("ecom_speed_pro_desktop_token", DESKTOP_AUTH_SECRET);
  } catch (e) {}
});
