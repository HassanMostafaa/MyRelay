let cachedSecret: Uint8Array | null = null;

export const getJwtSecret = () => {
  if (cachedSecret) return cachedSecret;

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  cachedSecret = new TextEncoder().encode(secret);
  return cachedSecret;
};
