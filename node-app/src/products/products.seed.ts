import {Connection} from 'typeorm';
import {Factory, Seeder} from 'typeorm-seeding'
import {Product} from "./products.entity";

export class productCreateSeed implements Seeder{
    public async run(factory: Factory, connection: Connection): Promise<void>{
        await factory(Product)().createMany(20)
    }
}