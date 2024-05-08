import { Prize } from "./Prize.interface";

export interface GetPrizesResponse {
    ok: boolean;
    prizes: Prize[];
}