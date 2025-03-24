import { createConnection } from 'typeorm';
import { useSeeding, runSeeder } from 'typeorm-seeding';
import { categoriesCreateSeed } from './categories/categories.seed';
import { productCreateSeed } from './products/products.seed';

import './categories/categories.factory';
import './products/products.factory';

(async () => {
    const connection = await createConnection({
        type: 'postgres',
        host: 'pg',
        port: 5432,
        username: 'pguser',
        password: 'password',
        database: 'nestjs',
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true,
    });

    await useSeeding({
        connection: 'default'
    });
    await runSeeder(categoriesCreateSeed);
    await runSeeder(productCreateSeed);
    process.exit(0);
})();