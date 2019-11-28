import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ac_inscripciones_alumnos",{schema:"colegio_pdc" } )
export class AcInscripcionesAlumnos {

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
        name:"id_alumno"
        })
    idAlumno:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_plantel"
        })
    idPlantel:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_nivel"
        })
    idNivel:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_grado"
        })
    idGrado:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_grupo"
        })
    idGrupo:number;
        

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
        

    @Column("date",{ 
        nullable:true,
        name:"fecha_inicio"
        })
    fechaInicio:string | null;
        

    @Column("date",{ 
        nullable:true,
        name:"fecha_fin"
        })
    fechaFin:string | null;
        

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
        

    @Column("tinyint",{ 
        nullable:false,
        width:1,
        default: () => "'0'",
        name:"incluida"
        })
    incluida:boolean;
        

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
