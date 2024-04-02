"use server";

import { connectToDB } from "../database";
import Data from "../database/models/Data";


export async function createUser(user:any) {
  try {
    await connectToDB();
    const newUser = await Data.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}