import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export function withAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, sessionClaims } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Non autorizzato" });
    }

    const userRole = sessionClaims?.metadata?.role as string;

    if (req.url?.startsWith("/api/admin") && userRole !== "admin") {
      return res.status(403).json({ error: "Accesso negato" });
    }

    return handler(req, res);
  };
}