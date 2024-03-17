import * as bcrypt from 'bcrypt';

export class PasswordUtility {
  private static async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(10);
  }

  static async encryptPassword(password: string): Promise<string> {
    const salt = await this.generateSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  static async decryptPassword(hashedPassword: string, password: string) {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  }
}
