import { getServerSession } from "next-auth";
import { authOptions } from "../constants/next-options";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
