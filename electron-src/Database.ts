import "reflect-metadata"
import { DataSource } from "typeorm"
import { Medic } from "./entities/Medic.entity"
import { Specialty } from "./entities/Specialty.entity"
import { app } from 'electron';
import { join } from 'path';

const isDev = process.env.NODE_ENV !== 'production';



export class Database {
    private dataSource: DataSource
    private static instance: Database

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }

    private constructor() {
        this.dataSource = new DataSource({
            type: "sqlite",
            database: isDev
                ? "db.sqlite"
                : join(app.getPath("userData"), "db.sqlite"),
            entities: [Medic, Specialty],
            synchronize: true,
        })
    }

    public async initialize() {
        await this.dataSource.initialize();
    }

    public getDataSource() {
        return this.dataSource
    }
}
