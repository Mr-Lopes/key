import {Entity, PrimaryGeneratedColumn, Column, Index, UpdateDateColumn, CreateDateColumn, PrimaryColumn, BaseEntity} from "typeorm";

export default interface RealStateInterface {
    id : number;
    description : string;
    address : string;
    number : string;
    city : string;
    state : string;
    country : string;
    zipcode : number;
    lat : number;
    lng : number;
    bedrooms : number;
    bathrooms : number;
    parking : number;
    propertytype : string;
    homesize : number;
    lotsize : number;
    yearBuilt : number;
    status : string;
    isActive : boolean;
    numberOfViews : number;
    createdAt : Date;
    updatedAt : Date
}

@Entity()
export default class RealState extends BaseEntity {

    constructor(params:RealStateInterface) {
        super();
        Object.assign(this, params);
    }
    
    /**
     * Applies changes to this instance's properties in bulk
     * @param request.body
     * @returns current instance
     */
    mutate(params: RealStateInterface): void {
        // Avoid creating a new row when mutating an existing real states 
        params.id = this.id;
        Object.assign(this, params);
    }

    @PrimaryGeneratedColumn("increment")  
    id!: number;
    
    // Description of the property
    @Column("text")
    description!: string;

    @Column({
        length: 200
    })
    address!: string;
    
    // Some properties, usually townhouses share the same number,
    // followed by a letter
    // f.i. 80a, 80b, 80c
    @Column({
        length: 5
    })
    number!: string;
    
    @Column({
        length: 30
    })
    @Index()
    city!: string;
    
    @Column({
        length: 10
    })
    state!: string;
    
    @Column({
        length: 10
    })
    country!: string;
    
    @Column({
        type: "int",
        width: 8
    })
    @Index()
    zipcode!: number;
    
    @Column("double")
    lat!: number;
    
    @Column("double")
    lng!: number;
    
    @Column("int")
    bedrooms!: number;
    
    @Column("int")
    bathrooms!: number;
    
    @Column("int")
    parking!: number;
    
    @Column()
    @Index()
    propertytype!: string;
    
    // m**2 for metric system
    @Column("int")
    homesize!: number;
    
    // m**2 for metric system
    @Column("int")
    lotsize!: number;
    
    @Column()
    @Index()
    yearBuilt!: number;

    // Here a few status come to mind: Pending, Available, Under-contract, Foreclsoe
    @Column()
    @Index()
    status!: string;

    // Is the listing active
    @Column()
    @Index()
    isActive!: boolean;

    // Number of times this real states has been seen
    @Column()
    numberOfViews!: number;

    // Datetime that the listing was created
    @CreateDateColumn({ name: 'createdAt', select: false, update: false })
    createdAt!: Date;

    // Datetime that the listing was last updated
    @UpdateDateColumn({ name: 'updatedAt', select: false })
    updatedAt!: Date;

}
