import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class HttpToRpcExceptionFilter implements RpcExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): Observable<any> {
    const status = exception.getStatus();
    const message = exception.message;
    const response = exception.getResponse();

    // Ensure we send a plain object structure
    const errorResponse = {
      status: status,
      message: typeof response === 'string' ? response : (response as any)?.message || message,
      error: typeof response === 'string' ? exception.name : (response as any)?.error || exception.name,
      // You might want to include more details from the response if needed
      details: typeof response === 'object' && response !== null && !(response instanceof Error) ? response : undefined,
    };

    // Use RpcException or simply return the serializable object
    // RpcException might be slightly more standard, but returning the object works too
    // return throwError(() => new RpcException(errorResponse));
    return throwError(() => errorResponse); // Simpler approach often works fine
  }
}