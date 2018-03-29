import { GET, Path, PathParam, Context, ServiceContext } from 'typescript-rest';
import { Tags, Security } from 'typescript-rest-swagger';
import { Content } from '@cxcloud/core';

@Path('/content')
export class ContentController {
  @Context ctx: ServiceContext;

  @Path('/byId/:id')
  @Tags('content')
  @GET
  getEntryById(@PathParam('id') entryId: string) {
    return Content.getEntry(entryId);
  }

  @Path('/spaceInfo')
  @Tags('content')
  @GET
  getSpaceInfo() {
    return Content.getSpace();
  }

  @Tags('content')
  @GET
  getEntries() {
    return Content.getEntries(this.ctx.request.query);
  }
}
