import Image from "next/image";
import DateSelector from "../_components/dateselector";
import SlidingBar from "../_components/slidingbar";
import Add from "../../../../public/add.png";
import BusTable from "./_component/BusTable";
import GenericTable, { Data } from "../_components/generic-table";
import SmallTable from "../_components/small-staff";
import SmallBus from "../_components/small-bus";
import { getSession } from "@/lib/session";
import { Bus, Session } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { fetchBus } from "@/lib/user/action";
import AddBusModal from "./_component/AddBusModal";
import { Modal } from "@/app/components/ModalWrapper";

export default async function BusManagement() {
  const session: Session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const busResponse = await fetchBus(session.token, {});

  const buses: Bus[] = busResponse.content;

  console.log(buses);

  return (
    <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[33px] gap-8 max-sm:gap-4">
      <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448]">
        Bus Management
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
          <AddBusModal session={session} />
          {/* <SlidingBar sections={["Bus List"]}>
            <div
              id="largegenerictable"
              className="flex cursor-pointer font-Gilroy-SemiBold w-[164px] gap-1 rounded-lg max-sm:hidden hover:scale-105 duration-300 flex-row py-2 px-[20px] text-white bg-[#005A86] justify-center items-center"
            >
              <span> Add Bus </span>
              <Image src={Add} className="w-6 h-6" alt="add" />
            </div>
          </SlidingBar> */}
        </div>

        <div className="flex flex-row items-center"></div>
      </div>
      <DateSelector />
      <BusTable buses={buses} />

      {/* <GenericTable
        data={buses}
        tableHeaders={[
          "bus Number",
          "model",
          "capacity",
          "color",
          "route",
          "status",
        ]}
      >
        <SmallBus />
      </GenericTable>{" "} */}
      {/* Add Bus Modal */}
    </div>
  );
}
