import { Button } from "@nextui-org/react"
import { ComponentType, FC } from "react"

export const minimize = () => {
    window.electron.windowControl('minimize')
}
export const maximize = () => {
    window.electron.windowControl('maximize')
}
export const close = () => {
    window.electron.windowControl('close')
}

export const WindowActions = () => {
    return <div className="flex flex-row gap-2 mr-1">
        <Button className="w-7 min-w-0 h-7" isIconOnly radius="full" color="success" onPress={minimize}/>
        <Button className="w-7 min-w-0 h-7" isIconOnly radius="full" color="warning" onPress={maximize}/>
        <Button className="w-7 min-w-0 h-7" isIconOnly radius="full" color="danger" onPress={close}/>
    </div>
}