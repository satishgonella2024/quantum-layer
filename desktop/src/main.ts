import { app, BrowserWindow, ipcMain, shell, Menu, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';
import isDev from 'electron-is-dev';
import { autoUpdater } from 'electron-updater';
import * as log from 'electron-log';

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;

// Keep a global reference of the window object to avoid garbage collection
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

async function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false, // Security: Keep Node integration disabled
      contextIsolation: true, // Security: Enable context isolation
      preload: path.join(__dirname, 'preload.js'), // Use preload script for safe IPC
    },
    show: false, // Don't show until ready-to-show
    backgroundColor: '#f5f5f5',
    titleBarStyle: 'hiddenInset', // Nicer looking title bar on macOS
    icon: path.join(__dirname, '../build/icon.png'),
  });

  // Load the app
  if (isDev) {
    // Load from dev server in development
    await mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // Load the built Next.js app in production
    await mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../../web/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  // Show window when ready
  mainWindow.on('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });

  // Open external links in the default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle window closing
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create the application menu
  createAppMenu();

  // Create system tray icon
  createTray();
}

function createTray() {
  tray = new Tray(path.join(__dirname, '../build/tray-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open QuantumLayer', click: () => mainWindow?.show() },
    { type: 'separator' },
    { label: 'Check for Updates', click: () => autoUpdater.checkForUpdatesAndNotify() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setToolTip('QuantumLayer');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => mainWindow?.show());
}

function createAppMenu() {
  const isMac = process.platform === 'darwin';
  const template: any = [
    // App menu (macOS only)
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { label: 'Check for Updates', click: () => autoUpdater.checkForUpdatesAndNotify() },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // File menu
    {
      label: 'File',
      submenu: [
        { label: 'New Agent', accelerator: 'CmdOrCtrl+N' },
        { label: 'Open Agent', accelerator: 'CmdOrCtrl+O' },
        { type: 'separator' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S' },
        { label: 'Save As...', accelerator: 'CmdOrCtrl+Shift+S' },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // Edit menu
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    // View menu
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // Help menu
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://github.com/satishgonella2024/quantum-layer');
          }
        },
        {
          label: 'Documentation',
          click: async () => {
            await shell.openExternal('https://github.com/satishgonella2024/quantum-layer/tree/main/docs');
          }
        },
        { type: 'separator' },
        {
          label: 'About QuantumLayer',
          click: () => {
            app.showAboutPanel();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Handle app events
app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow?.show();
  }
});

// Set up auto-updater events
autoUpdater.on('update-available', (info) => {
  log.info('Update available:', info);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded:', info);
  // Notify the user that an update has been downloaded
});

// IPC handlers
ipcMain.handle('app:version', () => app.getVersion());
