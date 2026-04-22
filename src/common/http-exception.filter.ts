import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Response, Request } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        //  1. ERROR DE MONGOOSE (ObjectId inválido)
        if (exception.name === 'CastError') {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'ID inválido',
                error: 'Bad Request',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }

        // 2. ERRORES CONTROLADOS (HttpException)
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res = exception.getResponse();

            const message = typeof res === 'string'
                ? res
                : Array.isArray((res as any).message)
                    ? (res as any).message
                    : (res as any).message ?? exception.message;

            return response.status(status).json({
                statusCode: status,
                message,
                error: exception.name,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }

        //CUALQUIER OTRO ERROR (fallback)
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: 500,
            message: 'Error interno del servidor',
            error: 'Internal Server Error',
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}