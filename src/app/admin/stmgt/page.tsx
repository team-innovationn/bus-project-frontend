import ExportData from "@/components/Export";
import { FetchUserParams, fetchUsers } from "@/lib/admin/staff/action";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SlidingBar from "../_component/slidingbar";
import StaffData from "./_component/StaffData";

export default async function StaffManagement({ searchParams }: { searchParams: FetchUserParams }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const usersResponse = await fetchUsers(session.token, {
    page: searchParams.page || 0,
    per_page: 5,
    name: searchParams.name,
    verificationStatus: searchParams.verificationStatus
  });

  const users = usersResponse.content;

  return (
    <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[10px] gap-5 max-sm:gap-4">
      <h1 className="text-[32px] max-sm:text-[25px] text-[#023448]"> Staff Management</h1>


      <div className="flex flex-col">
        <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
          <SlidingBar sections={["Staff List"]}>
            <ExportData data={users} />
          </SlidingBar>
        </div>

        <div className="flex flex-row items-center"></div>
      </div>


      {/* Staff data */}
      <StaffData session={session} users={users} />
    </div>
  );
}
