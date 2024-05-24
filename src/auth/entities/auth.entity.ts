import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Auth")
export class AuthEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  idx: number;

  @Column({ type: "varchar", nullable: false, length: 20 })
  user_code: string;

  @Column({ type: "varchar", nullable: false })
  token: string;

  @Column({ type: "varchar", nullable: false, length: 1, default: "N" })
  del: string;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP()" })
  created_date: Date;

  @UpdateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP()" })
  updated_date: Date;
}
