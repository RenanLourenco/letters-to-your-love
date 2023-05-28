import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Letter } from "./Letter";


@Entity('users')

export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'text', nullable:false})
    name: string

    @Column({type:'text', unique:true, nullable:false})
    email: string

    @Column({type:'text', nullable:false})
    password: string

    @OneToMany(() => Letter, letter => letter.sender)
    lettersSend: Letter[]

    @OneToMany(() => Letter, letter => letter.receiver)
    lettersReceived: Letter[]

}