import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Episode",
})
export class EpisodeDAL extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: number;

    @Column({
        nullable: false,
    })
    id: number;

    @Column({
        nullable: true,
    })
    url: string;

    @Column({
        default: 1,
    })
    season: number;

    @Column({
        nullable: true,
    })
    title: string;

    @Column({
        default: false,
    })
    notified: boolean;
}
