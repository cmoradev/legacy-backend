import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ac_inscripciones_externos",{schema:"colegio_pdc" } )
export class AcInscripcionesExternos {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:200,
        name:"clave_inscripcion"
        })
    claveInscripcion:string;
        

    @Column("int",{ 
        nullable:false,
        name:"id_academia"
        })
    idAcademia:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_externo"
        })
    idExterno:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_plantel"
        })
    idPlantel:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_ac_grupo"
        })
    idAcGrupo:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_agente"
        })
    idAgente:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:250,
        name:"descripcion"
        })
    descripcion:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:230,
        name:"dias"
        })
    dias:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:230,
        name:"horario"
        })
    horario:string | null;
        

    @Column("timestamp",{ 
        nullable:false,
        default: () => "CURRENT_TIMESTAMP",
        name:"fecha_inscripcion"
        })
    fechaInscripcion:Date;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_agente_baja"
        })
    idAgenteBaja:number;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"fecha_baja"
        })
    fechaBaja:Date | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"motivo_baja"
        })
    motivoBaja:string | null;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_estado_inscripcion"
        })
    idEstadoInscripcion:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_ciclo"
        })
    idCiclo:number;
        

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
