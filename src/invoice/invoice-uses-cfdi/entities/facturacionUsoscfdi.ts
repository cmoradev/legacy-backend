import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("facturacion_usoscfdi",{schema:"colegio_pdc" } )
export class FacturacionUsoscfdi {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        name:"codigo"
        })
    codigo:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"nombre"
        })
    nombre:string;
        

    @Column("timestamp",{ 
        nullable:false,
        default: () => "CURRENT_TIMESTAMP",
        name:"created_at"
        })
    createdAt:Date;
        

    @Column("timestamp",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"updated_at"
        })
    updatedAt:Date | null;
        
}
