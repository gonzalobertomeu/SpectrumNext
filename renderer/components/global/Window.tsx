import React from "react";
import { Sidebar } from "../navigation/Sidebar";
import { WindowActions } from "./WindowActions";

export const Window = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row h-screen p-4 gap-5">
            {/* Left Side */}
            <div className="max-w-80 min-w-60 flex flex-1 flex-col">
                <div className="h-10 flex flex-col justify-center mb-5 titlebar-drag">
                    <h1 className="text-center text-4xl font-light titlebar-drag no-select">
                        SpectrumDx
                    </h1>
                </div>
                <Sidebar />
            </div>
            {/* Right Side */}
            <div className="flex flex-1 flex-col">
                <div className="h-10 flex flex-row mb-5 items-center justify-between titlebar-drag">
                    <div>Breadcrumbs</div>
                    <WindowActions />
                </div>
                <div className="bg-blue-100 flex flex-1 rounded-xl">
                    {children}
                </div>
            </div>
        </div>
    );
};
