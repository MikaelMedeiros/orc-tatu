import { TokenInfoDTO } from "./tokenInfoDTO";

export class Usuario {
    name!: string;
    picture!: string;
    accessToken!: string;
    tokenType!: string;
    refreshToken!: string;
    expiration!: number;
}
