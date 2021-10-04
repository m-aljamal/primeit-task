import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../components/prisma";
import nc from "next-connect";
import onError from "../../components/onError";
import rateLimit from "../../components/rateLimit";

const handler = nc({
  onError,
});

// handler.use(rateLimit);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userData = JSON.parse(req.body);
    userData.avatar = `https://i.pravatar.cc/${Math.round(
      Math.random() * 2000
    )}`;
    const user = await prisma.user.create({
      data: userData,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("server", error);
  }
});

export default handler;
