const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/username-check`;

type UsernameCheckServiceResponse = {
  status: "success";
  data: {
    username: string | null;
    exists: boolean;
    available: boolean;
  };
};

export const usernameCheckService = async ({
  username,
  signal,
}: {
  username: string;
  signal?: AbortSignal;
}) => {
  const res = await fetch(`${ENDPOINT}?username=${encodeURIComponent(username)}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("Username check failed");
  }

  const body = (await res.json()) as UsernameCheckServiceResponse;

  if (body.status !== "success") {
    throw new Error("Username check failed");
  }

  return body.data;
};
