import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Specialty } from "./Specialty.entity"

@Entity()
export class Medic {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column()
    surname!: string

    @ManyToOne(() => Specialty, (speciality) => speciality.id)
    specialty!: Specialty
}
