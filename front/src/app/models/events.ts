import { entityKeyDTO } from "./entitykey";
import { paramDTO } from "./param";

export interface eventDTO{
    eventId: string;
    entityType: string;
    effectiveStartDate: Date;
    publishedAt: Date;
    publishedBy: string;
    repost: boolean;
    entityKeys: entityKeyDTO[];
    params: paramDTO[];
}