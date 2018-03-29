import { GET, Path } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Categories } from '@cxcloud/core/dist/commerce';
import { Category } from '@cxcloud/ct-types/categories';

@Path('/categories')
export class CategoriesController {
  @Tags('products', 'categories')
  @GET
  getCategories(): Promise<Category[]> {
    return Categories.fetchAll();
  }
}
