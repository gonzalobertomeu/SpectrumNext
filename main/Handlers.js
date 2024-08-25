"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handlers = void 0;
const WindowActions_handler_1 = require("./handlers/WindowActions.handler");
class Handlers {
    static register(window) {
        (0, WindowActions_handler_1.WindowActions)(window);
    }
}
exports.Handlers = Handlers;
