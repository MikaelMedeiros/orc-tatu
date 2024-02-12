import { TokenInfoDTO } from "./model/tokenInfoDTO";

export class Usuario {
    name!: string;
    picture!: string;
    tokenInfoDTO!: TokenInfoDTO;
    expiration!: Date;
}
