import {
  GET,
  POST,
  DELETE,
  PUT,
  Path,
  PathParam,
  QueryParam,
  Context,
  ServiceContext
} from 'typescript-rest';
import { Tags, Security } from 'typescript-rest-swagger';
import { Orders, Customers, Users } from '@cxcloud/core/dist/commerce';
import {
  OAuthToken,
  Customer,
  PaginatedCustomerResult
} from '@cxcloud/ct-types/customers';
import { UpdateAction } from '@cxcloud/ct-types/common';
import { PaginatedOrderResult, Order } from '@cxcloud/ct-types/orders';
import { ILogin } from './auth-controller';
import { getQueryOptions } from '../utils/query';

interface IEntityUpdate {
  actions: UpdateAction[];
}

@Path('/admin')
export class AdminController {
  @Path('/auth/login')
  @Tags('auth', 'admin')
  @POST
  loginAdmin(body: ILogin): Promise<OAuthToken> {
    const { username, password } = body;
    return Users.adminLogin(username, password);
  }
}

@Path('/admin/orders')
export class OrdersAdminController {
  @Context ctx: ServiceContext;

  @Tags('orders', 'admin')
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
      true,
      getQueryOptions(page, perPage, sortPath, ascending)
    );
  }

  @Path('/:id')
  @Tags('orders', 'admin')
  @Security('token')
  @GET
  getOrderById(@PathParam('id') orderId: string): Promise<Order> {
    return Orders.findById(orderId, this.ctx.response.locals.authToken, true);
  }

  @Path('/:id/:version')
  @Tags('orders', 'admin')
  @Security('token')
  @PUT
  updateOrder(
    @PathParam('id') orderId: string,
    @PathParam('version') orderVersion: number,
    body: IEntityUpdate
  ): Promise<Order> {
    const { actions } = body;
    return Orders.update(
      orderId,
      orderVersion,
      actions,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/:id/:version')
  @Tags('orders', 'admin')
  @Security('token')
  @DELETE
  deleteOrder(
    @PathParam('id') orderId: string,
    @PathParam('version') orderVersion: number
  ): Promise<Order> {
    return Orders.remove(
      orderId,
      orderVersion,
      this.ctx.response.locals.authToken
    );
  }
}

@Path('/admin/customers')
export class CustomersAdminController {
  @Context ctx: ServiceContext;

  @Tags('customers', 'admin')
  @Security('token')
  @GET
  getCustomers(
    @QueryParam('page') page?: number,
    @QueryParam('perPage') perPage?: number,
    @QueryParam('sortPath') sortPath?: string,
    @QueryParam('ascending') ascending?: boolean
  ): Promise<PaginatedCustomerResult> {
    return Customers.fetchAll(
      this.ctx.response.locals.authToken,
      getQueryOptions(page, perPage, sortPath, ascending)
    );
  }

  @Path('/:id')
  @Tags('customers', 'admin')
  @Security('token')
  @GET
  getCustomerById(@PathParam('id') customerId: string): Promise<Customer> {
    return Customers.findById(customerId, this.ctx.response.locals.authToken);
  }

  @Path('/:id/:version')
  @Tags('customers', 'admin')
  @Security('token')
  @PUT
  updateCustomer(
    @PathParam('id') customerId: string,
    @PathParam('version') customerVersion: number,
    body: IEntityUpdate
  ): Promise<Customer> {
    const { actions } = body;
    return Customers.update(
      customerId,
      customerVersion,
      actions,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/:id/:version')
  @Tags('customers', 'admin')
  @Security('token')
  @DELETE
  deleteCustomer(
    @PathParam('id') customerId: string,
    @PathParam('version') customerVersion: number
  ): Promise<Customer> {
    return Customers.remove(
      customerId,
      customerVersion,
      this.ctx.response.locals.authToken
    );
  }
}
