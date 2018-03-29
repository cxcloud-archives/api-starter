import {
  POST,
  GET,
  DELETE,
  PUT,
  Path,
  PathParam,
  Context,
  ServiceContext
} from 'typescript-rest';
import { Tags, Security } from 'typescript-rest-swagger';
import { Carts } from '@cxcloud/core/dist/commerce';
import { Address } from '@cxcloud/ct-types/common';
import {
  Cart,
  IAddLineItem,
  IChangeLineItemQuantity
} from '@cxcloud/ct-types/carts';

interface ISetShippingMethod {
  shippingMethodId: string;
}

@Path('/carts')
export class CartsController {
  @Context ctx: ServiceContext;

  @Tags('carts')
  @Security('token')
  @POST
  createCart(): Promise<Cart> {
    return Carts.create(this.ctx.response.locals.authToken);
  }

  @Path('/active')
  @Tags('carts')
  @Security('token')
  @GET
  getActiveCart(): Promise<Cart> {
    return Carts.findActiveCart(this.ctx.response.locals.authToken);
  }

  @Path(':id')
  @Tags('carts')
  @Security('token')
  @GET
  getCart(@PathParam('id') id: string): Promise<Cart> {
    return Carts.findById(id, this.ctx.response.locals.authToken);
  }
}

@Path('/carts/:id/:version')
export class CartController {
  @Context ctx: ServiceContext;
  @PathParam('id') cartId: string;
  @PathParam('version') cartVersion: number;

  @Path('/lineItems')
  @Tags('carts')
  @Security('token')
  @POST
  addLineItems(body: IAddLineItem): Promise<Cart> {
    return Carts.addLineItems(
      this.cartId,
      this.cartVersion,
      body,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/lineItems/:lineItemId')
  @Tags('carts')
  @Security('token')
  @DELETE
  removeLineItem(@PathParam('lineItemId') lineItemId: string): Promise<Cart> {
    return Carts.removeLineItem(
      this.cartId,
      this.cartVersion,
      lineItemId,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/lineItems')
  @Tags('carts')
  @Security('token')
  @PUT
  changeLineItemQuantity(body: IChangeLineItemQuantity): Promise<Cart> {
    return Carts.changeLineItemQuantity(
      this.cartId,
      this.cartVersion,
      body,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/shippingAddress')
  @Tags('carts')
  @Security('token')
  @PUT
  setShippingAddress(body: Address): Promise<Cart> {
    return Carts.setShippingAddress(
      this.cartId,
      this.cartVersion,
      body,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/billingAddress')
  @Tags('carts')
  @Security('token')
  @PUT
  setBillingAddress(body: Address): Promise<Cart> {
    return Carts.setBillingAddress(
      this.cartId,
      this.cartVersion,
      body,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/shippingMethod')
  @Tags('carts')
  @Security('token')
  @PUT
  setShippingMethod(body: ISetShippingMethod): Promise<Cart> {
    const { shippingMethodId } = body;
    return Carts.setShippingMethod(
      this.cartId,
      this.cartVersion,
      shippingMethodId,
      this.ctx.response.locals.authToken
    );
  }
}
