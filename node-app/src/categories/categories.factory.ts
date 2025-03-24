import { define } from 'typeorm-seeding';
import { Category } from "./category.entity";
import { randProductCategory, randSentence, randUrl } from '@ngneat/falso';

define(Category, () => {
    const category = new Category();
    category.name = randProductCategory();
    category.description = randSentence();
    category.image = randUrl();
    return category;
});

export {}; 