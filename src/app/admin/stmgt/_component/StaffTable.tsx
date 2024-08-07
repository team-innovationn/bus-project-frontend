"use client";

import { Modal } from "@/components/ModalWrapper";
import { Account, ACCOUNT_STATUS, Session } from "@/lib/definitions";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import ViewStaffModal from "./ViewStaffModal";
import { BsCheck } from "react-icons/bs";

export type StaffTableProps = {
  staffData: Account[];
  session: Session
  batchUpdate: boolean
  toggleBatchUpdateItem(id: string): void,
  batchUpdateItems: Set<string>
};

export default function StaffTable({
  staffData,
  session,
  batchUpdate,
  toggleBatchUpdateItem,
  batchUpdateItems, }: StaffTableProps) {
  const [openModal, setOpenModal] = useState<Account | undefined>(undefined);

  return (
    <>
      <div id="largegenerictable" className="flex flex-col gap-2 text-[16px] ">
        <table className="w-full  border-separate border-spacing-y-4 ">
          <thead className="">
            <tr id="header" className="text-[#00567B] pb-20">
              {batchUpdate &&
                <th className="pl-2"></th>
              }
              <th className="">S/N</th>
              <th className="font-Gilroy-SemiBold">Name</th>
              <th className="font-Gilroy-SemiBold">Department</th>
              <th className="font-Gilroy-SemiBold">Authority</th>
              <th className="font-Gilroy-SemiBold">Staff ID</th>
              <th className="font-Gilroy-SemiBold">Email Address</th>
              <th className="font-Gilroy-SemiBold">Phone Number</th>
              <th className="font-Gilroy-SemiBold">Status</th>
              <th className="font-Gilroy-SemiBold">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {staffData.map((item, index) => {

              return (
                <tr
                  id="staff"
                  key={index}
                  className={` text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D] ${batchUpdate && "cursor-pointer"}`}
                  onClick={() => {
                    if (!batchUpdate) {
                      return;
                    }
                    toggleBatchUpdateItem(`${item.id}`)
                  }}
                >
                  {batchUpdate ? (
                    <td>
                      <div className={`w-[20px] h-[20px] ${batchUpdateItems.has(`${item.id}`) ? "bg-ecobankBlue" : "bg-gray-500"} flex items-center justify-center rounded-sm`}>
                        <BsCheck className="text-white" size={20} />
                      </div>
                    </td>
                  ) : (
                    null
                  )}
                  {" "}
                  <td className={`${!batchUpdate && "rounded-l-lg"} whitespace-nowrap`}>
                    {index + 1}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.firstName}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.department}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.role}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.staff_id}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.email}
                  </td>
                  <td
                    className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.telephone}
                  </td>
                  <td className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
                    <span
                      className={classNames({
                        " text-[#3C8930] bg-[#3C8930]/40 ":
                          item.verificationStatus.toUpperCase() ==
                          ACCOUNT_STATUS.ACCEPTED,
                        " text-[#ddce2c] bg-[#ddce2c]/40":
                          item.verificationStatus.toUpperCase() == ACCOUNT_STATUS.PENDING,
                        " text-[#B3261E] bg-[#B3261E]/40":
                          item.verificationStatus.toUpperCase() ==
                          ACCOUNT_STATUS.REJECTED,
                        " text-[#3C8930] bg-[#3C8930]/40":
                          item.verificationStatus.toUpperCase() ==
                          ACCOUNT_STATUS.APPROVED,
                        "flex justify-center items-center max-w-[130px]  py-1 rounded-lg  w-full":
                          true,
                      })}
                    >
                      {item.verificationStatus.toUpperCase()}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 rounded-r-lg border-none whitespace-nowrap font-Gilroy-Regular hover:cursor-pointer hover:text-blue-500 hover:text-lg ease-in transition-all `}
                    onClick={() => setOpenModal(item)}
                  >
                    View
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SHow update staff modal */}

      {openModal && (
        <Modal bare closeModal={() => setOpenModal(undefined)}>
          <ViewStaffModal session={session} account={openModal} closeModal={() => setOpenModal(undefined)} />
        </Modal>
      )}
    </>
  );
}
