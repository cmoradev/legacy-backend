import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("familias_integrantes_tutores",{schema:"colegio_pdc" } )
export class FamiliasIntegrantesTutores {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idfamilia"
        })
    idfamilia:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"nombre"
        })
    nombre:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"apellido_pa"
        })
    apellidoPa:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"apellido_ma"
        })
    apellidoMa:string;
        

    @Column("date",{ 
        nullable:false,
        name:"fech_nac"
        })
    fechNac:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:30,
        name:"curp"
        })
    curp:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"estado_civil"
        })
    estadoCivil:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"ocupacion"
        })
    ocupacion:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"empresa"
        })
    empresa:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"cargo"
        })
    cargo:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:15,
        name:"celular"
        })
    celular:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:15,
        name:"celular_ref"
        })
    celularRef:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:15,
        name:"telefono_oficina"
        })
    telefonoOficina:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:70,
        name:"correo"
        })
    correo:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:200,
        name:"domiciolio"
        })
    domiciolio:string;
        

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
