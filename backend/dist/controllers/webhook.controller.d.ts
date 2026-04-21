import { Request, Response } from 'express';
export declare class WebhookController {
    /**
     * Handle incoming data from n8n or other automation tools
     * Example: AI Summary Agent sends a market report
     */
    static handleN8N(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
