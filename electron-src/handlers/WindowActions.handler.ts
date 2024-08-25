import { BrowserWindow, ipcMain } from "electron";

export const WindowActions = (window: BrowserWindow) => {
    ipcMain.on('window-action', (_,action: string) => {
        switch(action) {
            case 'minimize':
                window.minimize();
                break;
            case 'maximize':
                if (window.isMaximized()) {
                    window.unmaximize();
                } else {
                    window.maximize();
                }
                break;
            case 'close':
                window.close();
                break;
            default:
                break;
        }
    })
}