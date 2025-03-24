import {Connection} from 'typeorm';
import {Factory, Seeder} from 'typeorm-seeding'
import {Category} from "./category.entity";

export class categoriesCreateSeed implements Seeder{
    public async run(factory: Factory, connection: Connection): Promise<void>{
        await factory(Category)().createMany(20)
    }
}