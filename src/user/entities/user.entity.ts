import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("User")
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  idx: number;

  @Column({ type: "varchar", nullable: false, length: 20, unique: true })
  user_code: string;

  @Column({ type: "varchar", nullable: false, length: 30, unique: true })
  id: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  pw: string;

  @Column({ type: "varchar", nullable: false, length: 30 })
  name: string;

  @Column({ type: "varchar", length: 30 })
  email: string;

  @Column({ type: "varchar", length: 30 })
  phone: string;

  @Column({ type: "varchar", length: 10 })
  birth: string;

  @Column({ type: "varchar", length: 1, default: "N" })
  del: string;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP()" })
  created_date: Date;

  @UpdateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP()" })
  updated_date: Date;

  @DeleteDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP()" })
  deleted_date: Date;
}
