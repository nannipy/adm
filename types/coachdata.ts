import { UserJSON } from "@clerk/types";

export interface Coachdata extends UserJSON {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
}
