import KhaltiPayment from "@/components/video/KhaltiPayment";
import { getSessions } from "@/actions/sessions";

export default async function KhaltiPage() {
    const session = await getSessions();
    if (!session?.user?.id) {
        return <div className="p-4 text-center">Invalid session .</div>;
    }

    return (
        <KhaltiPayment
            userId={session.user.id}
        />
    );
}
