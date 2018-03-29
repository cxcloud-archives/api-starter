import { GET, Path } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Shipping } from '@cxcloud/core/dist/commerce';
import { ShippingMethod } from '@cxcloud/ct-types/shipping';

@Path('/shipping')
export class ShippingController {
  @Path('/methods')
  @Tags('shipping')
  @GET
  getShippingMethods(): Promise<ShippingMethod[]> {
    return Shipping.fetchMethods();
  }
}
