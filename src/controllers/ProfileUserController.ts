import { Request, Response } from "express";
import { ProfileUserServices } from "../services/ProfileUserServices";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new ProfileUserServices();
    const result = await service.execute(user_id);

    return response.json(result);
  }
}

export { ProfileUserController };
