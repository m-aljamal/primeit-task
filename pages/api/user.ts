import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../components/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json({ error: "Not Found" });
  }

  const userData = JSON.parse(req.body);
  userData.avatar = `https://i.pravatar.cc/${Math.round(Math.random() * 2000)}`;
  const user = await prisma.user.create({
    data: userData,
  });
  res.status(200).json(user);
}
