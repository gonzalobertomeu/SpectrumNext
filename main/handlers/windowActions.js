"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowActions = exports.WinAction = void 0;
const electron_1 = require("electron");
var WinAction;
(function (WinAction) {
    WinAction["MINIMIZE"] = "minimize";
    WinAction["MAXIMIZE"] = "maximize";
    WinAction["CLOSE"] = "close";
})(WinAction = exports.WinAction || (exports.WinAction = {}));
const WindowActions = (window) => {
    electron_1.ipcMain.on('window-action', (_, action) => {
        switch (action) {
            case WinAction.MINIMIZE:
                window.minimize();
                break;
            case WinAction.MAXIMIZE:
                if (window.isMaximized()) {
                    window.unmaximize();
                }
                else {
                    window.maximize();
                }
                break;
            case WinAction.CLOSE:
                window.close();
                break;
            default:
                break;
        }
    });
};
exports.WindowActions = WindowActions;
