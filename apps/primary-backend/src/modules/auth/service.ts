import { prisma } from "db";
import { AuthModel } from "./model";
import bcrypt from "bcryptjs";
import { status } from "elysia";

export abstract class AuthService {
  static async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthModel.signUpResponseSchema> {
    if (!email || !password || !name) {
      throw status(400, {
        message: "Missing fields!",
      } satisfies AuthModel.signUpFailedSchema);
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw status(400, {
        message: "User already exists!",
      } satisfies AuthModel.signUpFailedSchema);
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const created = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      id: created.id,
      message: "User registration done successfully!",
    };
  }
  static async signIn(
    email: string,
    password: string,
  ): Promise<{ correctCredentials: boolean; userId: string }> {
    if (!email || !password) {
      throw status(400, {
        message: "Missing fields!",
      } satisfies AuthModel.signInFailedSchema);
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw status(400, {
        message: "User already exisits!",
      } satisfies AuthModel.signUpFailedSchema);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw status(400, {
        message: "Password is not correct!",
      } satisfies AuthModel.signInFailedSchema);
    }

    return {
      correctCredentials: true,
      userId: user.id,
    };
  }
}
