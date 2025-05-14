import { Request } from "express";
import { UserJwtPayload } from "../types";

export interface AuthenticatedRequest extends Request {
    user?: UserJwtPayload;
}