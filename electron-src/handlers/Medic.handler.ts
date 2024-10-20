import { ipcMain } from "electron";
import { MedicDomain } from "../domain/Medic.domain";

export const MedicHandler = () => {
    ipcMain.handle('medic', async (_, action: string, args: any[]) => {
        console.log(action, args)
        switch (action) {
            case 'create':
                try {
                    const medicDomain = new MedicDomain()
                    const medic = await medicDomain.create(args[0], args[1], args[2])
                    console.log(medic)
                    return medic
                } catch (error) {
                    console.error(error)
                }
                break;
            case 'list':
                try {
                    const medicDomain = new MedicDomain()
                    const medics = await medicDomain.list()
                    console.log(medics)
                    return medics
                } catch (error) {
                    console.error(error)
                }
                break;
            case 'get':
                try {
                    const medicDomain = new MedicDomain()
                    const medic = await medicDomain.get(args[0])
                    console.log(medic)
                    return medic
                } catch (error) {
                    console.error(error)
                }
                break;
            default:
                break;
        }
    })
}