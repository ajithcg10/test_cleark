import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID! ||"1778288",
  key: process.env.PUSHER_APP_KEY! || "f90c6bbe22426ed99211",
  secret: process.env.PUSHER_APP_SECRET! || "7bc6931912b368d24314",
  cluster: "mt1",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.PUSHER_APP_KEY! ||"f90c6bbe22426ed99211",
  {
    cluster: "mt1",
  }
);
