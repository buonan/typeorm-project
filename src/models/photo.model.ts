import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user.model"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({name: 'url', type: 'text'})
    url: string | undefined

    @ManyToOne(() => User, (user) => user.photos)
    @JoinColumn({ name: 'user_id' })
    user: User | undefined
}