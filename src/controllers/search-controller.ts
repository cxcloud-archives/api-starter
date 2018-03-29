import {
  GET,
  Path,
  PathParam,
  QueryParam,
  Context,
  ServiceContext
} from 'typescript-rest';
import { Tags, Security } from 'typescript-rest-swagger';
import { Search } from '@cxcloud/core';

@Path('/search')
export class SearchController {
  @Context ctx: ServiceContext;

  @Path('/byIndex/:indexName')
  @Tags('search')
  @GET
  getEntryById(
    @PathParam('indexName') indexName: string,
    @QueryParam('query') query: string,
    @QueryParam('filters') filters?: string,
    @QueryParam('facets') facets?: string,
    @QueryParam('hitsPerPage') hitsPerPage?: number,
    @QueryParam('attributesToRetrieve') attributesToRetrieve?: string[]
  ) {
    return Search.searchIndex(indexName, this.ctx.request.query);
  }
}
