import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ac_inscrip_conceptos",{schema:"colegio_pdc" } )
export class AcInscripConceptos {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:200,
        name:"clave_inscripcion"
        })
    claveInscripcion:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:20,
        name:"codigo_producto"
        })
    codigoProducto:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:20,
        name:"codigo_unidad"
        })
    codigoUnidad:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"unidad"
        })
    unidad:string | null;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_academia"
        })
    idAcademia:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_concepto_cobro"
        })
    idConceptoCobro:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_estado_pago"
        })
    idEstadoPago:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:250,
        name:"descripcion"
        })
    descripcion:string | null;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'1'",
        name:"cantidad"
        })
    cantidad:number;
        

    @Column("date",{ 
        nullable:true,
        name:"fecha_pago"
        })
    fechaPago:string | null;
        

    @Column("date",{ 
        nullable:true,
        name:"fecha_pagado"
        })
    fechaPagado:string | null;
        

    @Column("float",{ 
        nullable:false,
        default: () => "'0'",
        name:"precio"
        })
    precio:number;
        

    @Column("float",{ 
        nullable:true,
        name:"oldprecio"
        })
    oldprecio:number | null;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_ac_cobro"
        })
    idAcCobro:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"is_iva"
        })
    isIva:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"is_isr"
        })
    isIsr:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"is_ivaretencion"
        })
    isIvaretencion:number;
        

    @Column("tinyint",{ 
        nullable:false,
        width:1,
        default: () => "'1'",
        name:"active"
        })
    active:boolean;
        

    @Column("timestamp",{ 
        nullable:false,
        default: () => "CURRENT_TIMESTAMP",
        name:"created_at"
        })
    createdAt:Date;
        

    @Column("timestamp",{ 
        nullable:false,
        default: () => "CURRENT_TIMESTAMP",
        name:"updated_at"
        })
    updatedAt:Date;
        
}
