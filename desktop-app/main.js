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
    show: false,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
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

  // Determine target URL: Auto-detect local development server if running, else load live production
  function resolveAndLoadUrl() {
    if (process.env.ADMIN_URL) {
      mainWindow.loadURL(process.env.ADMIN_URL);
      return;
    }

    const http = require("http");
    const checkReq = http.get("http://127.0.0.1:3000/api/health", { timeout: 300 }, (res) => {
      if (res.statusCode === 200) {
        mainWindow.loadURL(`http://localhost:3000/admin?desktop_token=${DESKTOP_AUTH_SECRET}`);
      } else {
        mainWindow.loadURL(`https://ecom-speed-pro.vercel.app/admin?desktop_token=${DESKTOP_AUTH_SECRET}`);
      }
    });

    checkReq.on("error", () => {
      mainWindow.loadURL(`https://ecom-speed-pro.vercel.app/admin?desktop_token=${DESKTOP_AUTH_SECRET}`);
    });

    checkReq.on("timeout", () => {
      checkReq.destroy();
      mainWindow.loadURL(`https://ecom-speed-pro.vercel.app/admin?desktop_token=${DESKTOP_AUTH_SECRET}`);
    });
  }

  resolveAndLoadUrl();

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });

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
