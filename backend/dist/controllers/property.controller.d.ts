import { Request, Response } from 'express';
export declare class PropertyController {
    static createProperty(req: Request, res: Response): Promise<void>;
    static getProperties(req: Request, res: Response): Promise<void>;
}
