import bcrypt from "bcrypt";

class PasswordService {
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
export const passwordService = new PasswordService();
