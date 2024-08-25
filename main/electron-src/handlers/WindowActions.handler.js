"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowActions = void 0;
const electron_1 = require("electron");
const IWinAction_1 = require("../../shared_interfaces/IWinAction");
const WindowActions = (window) => {
    electron_1.ipcMain.on('window-action', (_, action) => {
        switch (action) {
            case IWinAction_1.IWinAction.MINIMIZE:
                window.minimize();
                break;
            case IWinAction_1.IWinAction.MAXIMIZE:
                if (window.isMaximized()) {
                    window.unmaximize();
                }
                else {
                    window.maximize();
                }
                break;
            case IWinAction_1.IWinAction.CLOSE:
                window.close();
                break;
            default:
                break;
        }
    });
};
exports.WindowActions = WindowActions;
