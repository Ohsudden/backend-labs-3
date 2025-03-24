import {Body, Controller, Delete, Get, NotFoundException, Post, Query} from '@nestjs/common';
import {Pagination} from "nestjs-typeorm-paginate";
import {ProductsService} from "./products.service";
import {Product} from "./products.entity";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Get('')
    index(@Query('page') page = 1,  @Query('limit') limit = 10): Promise<Pagination<Product>> {
        return this.productsService.paginate({limit:limit, page:  page});
    }

    @Get(':id')
    show(id: number): Promise<Product | null> {
        return this.productsService.findOne(id);
    }

    @Post('')
    store(@Body() productData: Product ): Promise<Product> {
        return this.productsService.create(productData);
    }
    @Delete(':id')
    delete(id:number): void {
        const deleted =  this.productsService.remove(id);
        if (!deleted) {
            throw new NotFoundException(`Category #${id} not found`);
        }
    }
}
