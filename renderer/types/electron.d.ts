interface ElectronAPI {
    medic: (action: string, ...args: any[]) => Promise<any>;
    windowControl: (action: string) => void;
}

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}

export { };
