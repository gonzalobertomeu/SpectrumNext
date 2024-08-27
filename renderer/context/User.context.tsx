import { createContext, ReactNode, useState } from "react";
import { StatefulContext } from "./Context.interface";

export interface User {
    id: number;
    name: string;
    surname: string;
    speciality: string;
}

export const UserContext = createContext<StatefulContext<User | undefined>>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | undefined>(undefined)

    return <UserContext.Provider value={{ value: user, setValue: setUser }}>
        {children}
    </UserContext.Provider>
}