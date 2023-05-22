import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
class Utils {
  static createOtp(): string {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i += 1) {
      const randomIndex: number = crypto.randomInt(0, digits.length);
      OTP += digits[randomIndex];
    }
    return OTP;
  }

  static createHash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
}

export default Utils;
