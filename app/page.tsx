import WaitlistLandingPage from "@/components/waitlistLandingPage";
import connection from "@/lib/mongo";
import Waitlist from "@/lib/models/waitlist";

export const dynamic = "force-dynamic";

async function getWaitlistCount(): Promise<number> {
  try {
    await connection();
    return await Waitlist.countDocuments();
  } catch {
    return 0;
  }
}

export default async function RootPage() {
  const waitlistCount = await getWaitlistCount();
  return <WaitlistLandingPage waitlistCount={waitlistCount} />;
}
