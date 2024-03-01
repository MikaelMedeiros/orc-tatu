import { TokenInfoDTO } from "./tokenInfoDTO";

export class Usuario {
    name!: string;
    picture!: string;
    tokenInfoDTO!: TokenInfoDTO;
    expiration!: number;
}
