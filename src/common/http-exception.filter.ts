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

        console.error(exception); // 👈 IMPORTANTE (ver error real)

        if (exception.name === 'CastError') {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'ID inválido',
                error: 'Bad Request',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }

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

        // 👇 NO lo elimines, mejor déjalo así
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: 500,
            message: exception.message || 'Error interno del servidor',
            error: 'Internal Server Error',
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}