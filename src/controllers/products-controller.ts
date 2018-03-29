import { GET, Path, PathParam, QueryParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Products } from '@cxcloud/core/dist/commerce';
import { Product, PaginatedProductResult } from '@cxcloud/ct-types/products';
import { getQueryOptions } from '../utils/query';

@Path('/products')
export class ProductsController {
  @Path('/:id')
  @Tags('products')
  @GET
  getProduct(@PathParam('id') id: string): Promise<Product> {
    return Products.findById(id);
  }

  @Path('/byCategory/:categoryId')
  @Tags('products')
  @GET
  getProductsByCategory(
    @PathParam('categoryId') categoryId: string,
    @QueryParam('page') page?: number,
    @QueryParam('perPage') perPage?: number,
    @QueryParam('sortPath') sortPath?: string,
    @QueryParam('ascending') ascending?: boolean
  ): Promise<PaginatedProductResult> {
    return Products.findByCategoryId(
      categoryId,
      getQueryOptions(page, perPage, sortPath, ascending)
    );
  }
}
