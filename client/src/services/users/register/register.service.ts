import { RegisterFormValues } from "@/src/components/forms/register/utils/useRegisterForm";
import { ApiStatus, User } from "../utils/types";
import { handleLoginService } from "../login/login.service";

type RegisterRequestBody = Omit<RegisterFormValues, "passwordConfirm">;

type RegisterErrorData = {
  missing?: string[];
};

type RegisterResponseData = {
  message?: string;
  user?: User;
  status: ApiStatus;
  data?: RegisterErrorData;
  loginResponse?: { status: ApiStatus; message?: string; user: User | null };
};

const fullEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/register`;

export const handleRegisterService = async (
  values: RegisterFormValues,
): Promise<RegisterResponseData> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordConfirm: _passwordConfirm, ...body } = values || {};
  const requestBody: RegisterRequestBody = body;

  const res = await fetch(fullEndpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const json = await res.json();

  if (json.status === "error") {
    return { message: json.message, status: json.status, data: json.data };
  }

  const loginResponse = await handleLoginService({
    identifier: values?.username,
    password: values?.password,
  });

  return {
    status: json.status,
    user: json.data,
    message: json?.data?.message,
    loginResponse,
  };
};
