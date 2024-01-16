import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({
    name: "Episode",
})
export class EpisodeDAL extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        nullable: true,
    })
    url: string;

    @Column({
        nullable: true,
    })
    title: string;

    @Column({
        default: false,
    })
    notified: boolean;
}
