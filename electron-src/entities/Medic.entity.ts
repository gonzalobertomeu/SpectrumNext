import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Medic {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column()
    surname!: string

    @Column()
    speciality!: string
}
