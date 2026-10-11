const { app, BrowserWindow, Menu, shell, session } = require("electron");
const path = require("path");

const DESKTOP_AUTH_SECRET = "ESP_SECURE_DESKTOP_TOKEN_2026_9f8d1c7a4b";
let mainWindow;

function createWindow() {
  const iconPath = path.join(__dirname, "..", "public", "icon.png");

  mainWindow = new BrowserWindow({
    width: 1540,
    height: 960,
    minWidth: 1100,
    minHeight: 720,
    title: "ECOM SPEED PRO | لوحة تحكم الإدارة الفاخرة (برنامج سطح المكتب المعتمد)",
    backgroundColor: "#020718",
    autoHideMenuBar: true,
    show: true,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Remove top menu bar for clean native app appearance
  Menu.setApplicationMenu(null);

  // Set custom user agent with secret desktop app signature
  mainWindow.webContents.setUserAgent(
    "EcomSpeedPro-Desktop-Application/3.0 (Windows NT 10.0; Win64; x64) SecureAdminClient/9f8d1c7a4b"
  );

  // Automatically attach desktop authorization headers to all HTTP/HTTPS requests
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["X-Desktop-Auth-Token"] = DESKTOP_AUTH_SECRET;
    details.requestHeaders["X-Client-Type"] = "desktop-app";
    callback({ requestHeaders: details.requestHeaders });
  });

  // Load the standalone native desktop dashboard directly from computer files
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.focus();

  // Handle external links (like WhatsApp) in user default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://wa.me") || url.startsWith("mailto:")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
