"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowActions = void 0;
const electron_1 = require("electron");
const WindowActions = (window) => {
    electron_1.ipcMain.on('window-action', (_, action) => {
        switch (action) {
            case 'minimize':
                window.minimize();
                break;
            case 'maximize':
                if (window.isMaximized()) {
                    window.unmaximize();
                }
                else {
                    window.maximize();
                }
                break;
            case 'close':
                window.close();
                break;
            default:
                break;
        }
    });
};
exports.WindowActions = WindowActions;
