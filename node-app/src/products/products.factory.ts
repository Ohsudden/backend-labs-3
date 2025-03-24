import { define } from 'typeorm-seeding';
import {randProductCategory, randSentence, randImg, randUrl, randNumber} from '@ngneat/falso';
import {Product} from "./products.entity";

define(Product, () => {
    const product = new Product();
    product.name = randProductCategory();
    product.description = randSentence();
    product.image = randUrl();
    product.category_id = randNumber({ min: 10, max: 500 });
    product.price = randNumber({ min: 10, max: 500 });

    return product;
});
export {}; 
