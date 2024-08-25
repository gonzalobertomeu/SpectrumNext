import './global.css';
import type { AppProps } from "next/app";
import { NextUIProvider } from '@nextui-org/react';
import { Window } from '../components/global/Window';

export default function AppWrapper({Component,pageProps}: AppProps) {
    return (
        <NextUIProvider>
            <Window>
                <Component {...pageProps}/>
            </Window>
        </NextUIProvider>
    )
}