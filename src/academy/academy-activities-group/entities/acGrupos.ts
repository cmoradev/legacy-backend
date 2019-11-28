import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ac_grupos",{schema:"colegio_pdc" } )
export class AcGrupos {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"nombre"
        })
    nombre:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"horario"
        })
    horario:string;
        

    @Column("int",{ 
        nullable:true,
        default: () => "'0'",
        name:"id_maestro"
        })
    idMaestro:number | null;
        

    @Column("int",{ 
        nullable:false,
        name:"id_turno"
        })
    idTurno:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"id_academia"
        })
    idAcademia:number;
        

    @Column("int",{ 
        nullable:true,
        name:"min"
        })
    min:number | null;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'20'",
        name:"max"
        })
    max:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_ciclo"
        })
    idCiclo:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_plantel"
        })
    idPlantel:number;
        

    @Column("int",{ 
        nullable:false,
        default: () => "'0'",
        name:"activo"
        })
    activo:number;
        

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
