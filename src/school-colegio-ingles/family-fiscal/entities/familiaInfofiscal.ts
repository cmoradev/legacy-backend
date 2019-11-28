import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("familia_infofiscal",{schema:"colegio_pdc" } )
export class FamiliaInfofiscal {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_familia"
        })
    idFamilia:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:200,
        name:"familia"
        })
    familia:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:200,
        name:"razon_social"
        })
    razonSocial:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"rfc"
        })
    rfc:string;
        

    @Column("int",{ 
        nullable:false,
        name:"id_regimen"
        })
    idRegimen:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"correo"
        })
    correo:string;
        

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
