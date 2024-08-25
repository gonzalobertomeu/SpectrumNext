import { BrowserWindow } from "electron";
import { WindowActions } from "./handlers/WindowActions.handler";

export class Handlers {
    public static register(window: BrowserWindow) {
        WindowActions(window);
    }
}