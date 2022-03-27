import { boolean } from "fp-ts"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Photo } from "./photo.model"

@Entity()
export class Trans {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: 'varchar', nullable: true, unique: true, length: 200 })
    name: string | undefined

    @Column({type: 'bool'})
    sent: boolean | undefined

    @Column({type: 'date'})
    sent_at: Date | undefined
}