import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Photo } from "./photo.model"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: 'varchar', nullable: true, unique: true, length: 200 })
    name: string | undefined

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[] | undefined
}