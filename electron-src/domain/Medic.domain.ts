import { Repository } from "typeorm"
import { Database } from "../Database"
import { Medic } from "../entities/Medic.entity"

export class MedicDomain {

    private repository: Repository<Medic>

    public constructor() {
        this.repository = Database
            .getInstance()
            .getDataSource()
            .getRepository(Medic)
    }

    public async create(
        name: string,
        surname: string,
        speciality: string
    ) {
        const medic = new Medic()
        medic.name = name
        medic.surname = surname
        medic.speciality = speciality
        await this.repository.save(medic)
        return medic;
    }

    public async list() {
        return await this.repository.find()
    }

    public async get(id: string) {
        return await this.repository.findOneBy({ id })
    }
}