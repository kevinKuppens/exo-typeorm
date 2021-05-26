import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class baseModel{
    @PrimaryGeneratedColumn('increment')
    public id !: number;

    @CreateDateColumn()
    public creationDate !: Date;

    @UpdateDateColumn()
    public editionDate ?: Date;

    @DeleteDateColumn()
    public delectionDate ?: Date;

}