import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity('letters')

export class Letter{
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string

    @ManyToOne(() => User, user => user.lettersSend)
    @JoinColumn({name: 'sender_id'})
    sender: User

    @ManyToOne(() => User, user => user.lettersReceived)
    @JoinColumn({name: 'receiver_id'})
    receiver: User

}