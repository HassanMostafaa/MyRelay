import { pool } from "@/db/utils/pool";

type DBHealthCheckResponse = {
  service_name: string;
  status: string;
};

export const dbHealthCheck =
  async (): Promise<DBHealthCheckResponse | null> => {
    const result = await pool.query<DBHealthCheckResponse>(
      `
    SELECT * FROM db_health
    `,
    );

    return result?.rows?.[0] || null;
  };
