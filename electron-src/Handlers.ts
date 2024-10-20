import { BrowserWindow } from "electron";
import { WindowActions } from "./handlers/WindowActions.handler";
import { MedicHandler } from "./handlers/Medic.handler";

export class Handlers {
    public static register(window: BrowserWindow) {
        WindowActions(window);
        MedicHandler();
    }
}