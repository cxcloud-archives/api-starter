import { GET, Path, PathParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';

@Path('/hello')
export class HelloWorldController {
  @Path('/world/:name')
  @Tags('hello')
  @GET
  sayHelloWorld(@PathParam('name') name: string) {
    return `Hello World ${name}`;
  }
}
