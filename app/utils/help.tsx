"use server";
import { auth } from "@clerk/nextjs";

const { sessionClaims } = auth();
const userId = sessionClaims?.userId as string;

export default userId;
