import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [adminClient()],
});

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

export const signOut = async () => {
  await authClient.signOut();
};
