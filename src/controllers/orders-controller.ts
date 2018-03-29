import {
  POST,
  GET,
  Path,
  PathParam,
  QueryParam,
  Context,
  ServiceContext
} from 'typescript-rest';
import { Tags, Security } from 'typescript-rest-swagger';
import { Orders } from '@cxcloud/core/dist/commerce';
import { Order, PaginatedOrderResult } from '@cxcloud/ct-types/orders';
import { generateRandomNumber } from '../utils/random';
import { getQueryOptions } from '../utils/query';

interface ICreateOrder {
  cartId: string;
  cartVersion: number;
}

@Path('/orders')
export class OrdersController {
  @Context ctx: ServiceContext;

  @Tags('orders')
  @Security('token')
  @POST
  async createOrder(body: ICreateOrder): Promise<Order> {
    const { cartId, cartVersion } = body;
    return Orders.create(
      cartId,
      cartVersion,
      await generateRandomNumber('CXO-'),
      this.ctx.response.locals.authToken
    );
  }

  @Tags('orders')
  @Security('token')
  @GET
  getOrders(
    @QueryParam('page') page?: number,
    @QueryParam('perPage') perPage?: number,
    @QueryParam('sortPath') sortPath?: string,
    @QueryParam('ascending') ascending?: boolean
  ): Promise<PaginatedOrderResult> {
    return Orders.fetchAll(
      this.ctx.response.locals.authToken,
      false,
      getQueryOptions(page, perPage, sortPath, ascending)
    );
  }

  @Path('/:id')
  @Tags('orders')
  @Security('token')
  @GET
  getOrderById(@PathParam('id') orderId: string): Promise<Order> {
    return Orders.findById(orderId, this.ctx.response.locals.authToken);
  }
}
