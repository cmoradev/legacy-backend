import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ac_facturas",{schema:"colegio_pdc" } )
export class AcFacturas {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        name:"folio"
        })
    folio:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"uuid"
        })
    uuid:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:300,
        name:"razon_social"
        })
    razonSocial:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"rfc"
        })
    rfc:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:200,
        name:"total"
        })
    total:string | null;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_agente_facturador"
        })
    idAgenteFacturador:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_agente_cancelador"
        })
    idAgenteCancelador:number;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"fecha_cancelacion"
        })
    fechaCancelacion:Date | null;
        

    @Column("text",{ 
        nullable:true,
        name:"motivo_cancelacion"
        })
    motivoCancelacion:string | null;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_ac_cobro"
        })
    idAcCobro:number;
        

    @Column("tinyint",{ 
        nullable:false,
        default: () => "'1'",
        name:"status"
        })
    status:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_plantel"
        })
    idPlantel:number;
        

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
