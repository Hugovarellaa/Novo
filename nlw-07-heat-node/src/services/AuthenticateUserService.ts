//Receber o code(string)
//Recuperar o access_token no github
//Recuperar infor no github
//Verificar se o usuário existe no banco de dados
// ---SIM -> Gera um token
// ---NAO -> Cria no Banco de dados depois gera um token
//Retorna o token com as infos do user

import axios from "axios";

interface IAccessTokenResponse {
  access_token: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_SECRET_ID,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });
    
    const response = await axios.get("https://api.github.com/user" , {
      headers: {
        authorization: `Bearer ${accessTokenResponse}`
      }
    })
      
    return response.data;
  }
}

export { AuthenticateUserService };
