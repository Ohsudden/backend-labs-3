import {Body, Controller, Delete, Get, NotFoundException, Post, Query, Req} from '@nestjs/common';
import {Pagination} from "nestjs-typeorm-paginate";
import {Category} from "./category.entity";
import {CategoriesService} from "./categories.service";
import { Request } from 'express';
import {CreateCategoryDto} from "./create-category.dto";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @Get('')
    index(@Query('page') page = 1,  @Query('limit') limit = 10): Promise<Pagination<Category>> {
        return this.categoriesService.paginate({limit:limit, page:  page});
    }

    @Get(':id')
    show(id: number): Promise<Category | null> {
        return this.categoriesService.findOne(id);
    }

    @Post('')
    store(@Body() categoryData: CreateCategoryDto ): Promise<Category> {
        return this.categoriesService.create(categoryData);
    }
    @Delete(':id')
    delete(id:number): void {
        const deleted =  this.categoriesService.remove(id);
        if (!deleted) {
            throw new NotFoundException(`Category #${id} not found`);
        }
    }
}
