import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('admins')

export class Admin{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'text', nullable:false})
    name: string

    @Column({type:'text', unique:true, nullable:false})
    email: string

    @Column({type:'text', nullable:false})
    password: string

    
}