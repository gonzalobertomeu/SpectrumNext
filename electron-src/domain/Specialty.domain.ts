import { Repository } from "typeorm";
import { Specialty } from "../entities/Specialty.entity";
import { Database } from "../Database";

export class SpecialtyDomain {
    private repository: Repository<Specialty>

    public constructor() {
        this.repository = Database
            .getInstance()
            .getDataSource()
            .getRepository(Specialty)
    }

    public async default() {
        const specialties = await this.repository.find()
        if (specialties.length === 0) {
            const defaultSpecialties = [
                'Medicina General',
                'Cardiología',
                'Neurología',
                'Oncología',
                'Pediatría',
                'Psiquiatría'
            ]
            for (const specialty of defaultSpecialties) {
                const speciality = new Specialty()
                speciality.name = specialty
                await this.repository.save(speciality)
            }
        }
    }

    public async get(id: string) {
        return await this.repository.findOneBy({ id })
    }

    public async list() {
        return await this.repository.find()
    }
}   