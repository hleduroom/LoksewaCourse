import PublicProfileClient from "@/components/user/PublicProfileClient";

import { getSessions } from "@/actions/sessions";

export default async function PublicProfilePage() {
  const session = await getSessions();
  return <PublicProfileClient session={session} />;
}
