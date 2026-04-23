// src/http/routes/register/index.ts
import bcrypt from "bcrypt";
import { error, resolveLocale, success } from "@/http/utils/helpers";
import type { RouteMessage } from "@/http/utils/types";
import type { RegisterBody } from "@/http/routes/users/utils/types";
import { createUser } from "./db";

const METHOD = "POST";

const registerSuccessMessage: RouteMessage = {
  en: "Account created successfully",
  ar: "تم إنشاء الحساب بنجاح",
};

const validationFailedMessage: RouteMessage = {
  en: "Validation failed",
  ar: "فشل التحقق",
};

const emailExistsMessage: RouteMessage = {
  en: "Email already exists",
  ar: "البريد الإلكتروني مستخدم بالفعل",
};

const usernameExistsMessage: RouteMessage = {
  en: "Username already exists",
  ar: "اسم المستخدم مستخدم بالفعل",
};

export const registerRoute = async (req: Request) => {
  const locale = resolveLocale(req);

  switch (req.method) {
    case METHOD: {
      let body: RegisterBody;

      try {
        body = (await req.json()) as RegisterBody;
      } catch {
        return error("Invalid JSON", null, 400);
      }

      const requiredFields: (keyof RegisterBody)[] = [
        "email",
        "password",
        "username",
      ];

      const missing = requiredFields.filter((field) => {
        const value = body[field];
        return typeof value !== "string" || value.trim() === "";
      });

      if (missing.length > 0) {
        return error(validationFailedMessage[locale], { missing }, 400);
      }

      const email = body.email!.trim().toLowerCase();
      const username = body.username!.trim();
      const password = body.password!;

      if (password.length < 6) {
        return error(
          validationFailedMessage[locale],
          {
            password: "Password must be at least 6 characters",
          },
          400,
        );
      }

      try {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await createUser({
          email,
          username,
          passwordHash,
        });

        return success(
          {
            message: registerSuccessMessage[locale],
            user,
          },
          {
            status: 201,
          },
        );
      } catch (err) {
        const errorCode = err as { code?: string; constraint?: string };
        console.log({ err });
        if (errorCode.code === "23505") {
          if (errorCode.constraint === "users_email_key") {
            return error(emailExistsMessage[locale], err, 409);
          }

          if (errorCode.constraint === "users_username_key") {
            return error(usernameExistsMessage[locale], err, 409);
          }

          return error("Unique field already exists", err, 409);
        }

        return error("Something went wrong", err, 500);
      }
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
