import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./role.guard";

export const SHARED_GUARDS = [JwtAuthGuard, RolesGuard];