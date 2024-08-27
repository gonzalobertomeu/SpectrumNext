import './global.css';
import type { AppProps } from "next/app";
import { NextUIProvider } from '@nextui-org/react';
import { Window } from '../components/global/Window';
import { UserContextProvider } from '../context/User.context';

export default function AppWrapper({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <UserContextProvider>
                <Window>
                    <Component {...pageProps} />
                </Window>
            </UserContextProvider>
        </NextUIProvider>
    )
}