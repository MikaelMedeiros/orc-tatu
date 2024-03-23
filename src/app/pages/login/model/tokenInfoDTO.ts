export class TokenInfoDTO {


  constructor(public accessToken: string, public refreshToken: string, public expiration: number) {}
}
