import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import {Category} from "./categories/category.entity";
import {Product} from "./products/products.entity";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'pg',
            port: 5432,
            username: 'pguser',
            password: 'password',
            database: 'nestjs',
            entities: [Category, Product],
            synchronize: true,
            autoLoadEntities: true,
        }),
        CategoriesModule,
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
