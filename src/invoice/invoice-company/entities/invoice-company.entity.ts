import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Campus } from '../../../school-colegio-ingles/campuses/entities/campus.entity';
import { TypeFolio} from '../../interface/FolioInvoice.interface';


@Entity('facturacion_empresas')
export class InvoiceCompany {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'rfc',
  })
  rfc: string;

  @Column('varchar', {
    nullable: false,
    length: 300,
    name: 'razon_social',
  })
  businessName: string;

  @Column('text', {
    nullable: false,
    name: 'direccion',
  })
  address: string;

  @Column('int', {
    nullable: false,
    name: 'regimen',
  })
  regime: number;

  @Column('varchar', {
    nullable: false,
    length: 5,
    name: 'regimen_fiscal',
  })
  fiscalRegime: string;

  @Column('varchar', {
    nullable: false,
    length: 8,
    name: 'codigo_postal',
  })
  zip: string;

  @Column('int', {
    nullable: false,
    name: 'pais',
  })
  country: number;

  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'foliaje_nota',
  })
  foliajeNota: string | null;

  @Column('varchar', {
    nullable: false,
    length: 10,
    name: 'foliaje_factura',
  })
  foliajeFactura: string;

  @Column('varchar', {
    nullable: false,
    length: 10,
    name: 'foliaje_pago',
  })
  foliajePago: string;

  //-------
  @Column('int', {
    nullable: true,
    name: 'serie_nota',
  })
  serieNota: number;

  @Column('int', {
    nullable: true,
    name: 'serie_factura',
  })
  serieFactura: number;

  @Column('int', {
    nullable: true,
    name: 'serie_pago',
  })
  seriePago: number;

  //----
  @Column('varchar', {
    nullable: false,
    length: 5,
    name: 'serie_facturacion',
  })
  serieFacturacion: string;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'certificado_facturacion',
  })
  certificateInvoice: string;

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'correo',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    length: 60,
    name: 'cuenta_bancaria',
  })
  bankAccount: string;

  @Column('int', {
    nullable: false,
    name: 'id_plantel',
  })
  idPlantel: number;

  @Column({
    type: 'enum',
    nullable: false,
    name: 'id_modalidad',
    enum: TypeFolio,
    default: TypeFolio.colegio,
})
typeStudent: TypeFolio;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => Campus, (campus) => campus.invoices)
    invoiceCampus: Campus;

}
