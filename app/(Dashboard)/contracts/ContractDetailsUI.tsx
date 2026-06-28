'use client'

import { IconFileDescription, IconXFilled, IconChevronRightFilled, IconCaretLeftFilled, IconCopy, IconUser, IconCar, IconCalendarEvent, IconClock, IconCoin } from "@tabler/icons-react";
import { differenceInDays, format } from "date-fns";

interface props {
    contract: Contract
    changeModetoList: () => void
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface Contract {
    id: string
    policyType: string
    vehicleNumber: string
    vehicleModel: string
    paymentFrequency: number
    endDate: string
    startDate: string
    premiumAmmount: string
    customerId: string
    customers: Customer;
}

export default function ContractDetailsUI({ contract, changeModetoList }: props) {

    return (
        <div className="w-full h-full bg-[#F8FAFC]">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center justify-center gap-5">
                    <div className="flex items-center justify-center w-15 h-15 text-[#2563EB] bg-[#DBEAFE] rounded-md">
                        <IconFileDescription stroke={2} size={40} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-2xl font-bold text-[#0F172A]">Contract Details</label>
                        <label className="text-[#94A3B8] text-sm">Comprehensive contract information and details</label>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div onClick={changeModetoList} className="flex items-center justify-center gap-2 font-semibold rounded-lg border border-[#CBD5E1] hover:bg-[#3B82F6] hover:text-white cursor-pointer px-5 h-13 text-sm text-[#475569]">
                        <IconCaretLeftFilled />
                        Back
                    </div>
                </div>
            </div>

            <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-6 flex place-content-between">
                {/* Contract */}
                <div className="px-6 py-2">
                    <label className="text-sm text-[#0F172A] mb-4">Contract Number</label>

                    <div className="flex items-center gap-2 text-[#2563EB]">
                        <label className="font-semibold text-xs hover:underline cursor-pointer">{contract.id}</label>

                        <IconCopy stroke={2} className="cursor-pointer" />
                    </div>

                    <p className="text-sm text-[#475569] mt-5">Policy Number</p>
                    <p className="font-medium text-[#0F172A]">{`{Policy Number}`}</p>
                </div>

                <div className="border border-[#E5E7EB]" />

                {/* Customer */}
                <div className="px-6 py-2">
                    <label className="text-sm text-[#0F172A] mb-4">Customer</label>

                    <div className="flex items-center gap-2">
                        <IconUser stroke={2} className="text-[#0F172A]" />

                        <label className="font-semibold text-sm text-[#2563EB]">{contract.customers.name}</label>
                    </div>

                    <p className="text-sm text-[#475569] mt-5">Customer Id</p>
                    <p className="text-xs font-semibold text-[#0F172A]">{contract.customers.id}</p>
                </div>

                <div className="border border-[#E5E7EB]" />

                {/* Policy */}
                <div className="px-6 py-2">
                    <label className="text-sm text-[#0F172A] mb-4">Policy Type</label>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-sm">{contract.policyType}</label>
                    </div>

                    <p className="text-sm text-[#475569] mt-5">Policy Sub Type</p>
                    <p className="font-medium text-[#0F172A]">{`{Policy Sub Type}`}</p>
                </div>

                <div className="border border-[#E5E7EB]" />

                {/* Contract Period */}
                <div className="px-6 py-2 flex flex-col place-content-between">
                    <div className="flex flex-col gap-0">
                        <label className="text-sm text-[#0F172A] mb-1">Contract Period</label>
                        <div className="flex items-center gap-2">
                            <div className="flex bg-[#DCFCE7] text-[#16A34A] w-8 h-8 items-center justify-center rounded-full">
                                <IconCalendarEvent stroke={2} size={20} />
                            </div>
                            <div className="flex gap-1">
                                <label className="font-semibold text-sm">{format(new Date(contract.startDate), "MMM d, yyyy")}</label>
                                <label className="font-semibold text-[#94A3B8] text-sm">-</label>
                                <label className="font-semibold text-sm">{format(new Date(contract.endDate), "MMM d, yyyy")}</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-1 items-center justify-center bg-[#DCFCE7] px-3 py-2 rounded-full text-[#16A34A]">
                        <IconClock size={15} />
                        <p className="text-xs">{`${differenceInDays(contract.endDate, contract.startDate)} days remaining`}</p>
                    </div>
                </div>

                <div className="border border-[#E5E7EB]" />

                {/* Premium Ammount */}
                <div className="px-6 py-2 flex flex-col place-content-between">
                    <div className="flex flex-col gap-0">
                        <label className="text-sm text-[#0F172A] mb-1">Premium Ammount</label>
                        <div className="flex items-center gap-2">
                            <div className="flex bg-[#DCFCE7] text-[#16A34A] w-8 h-8 items-center justify-center rounded-full">
                                <IconCoin stroke={2} size={20} />
                            </div>
                            <label className="font-semibold text-sm text-[#16A34A]">{contract.premiumAmmount}</label>
                        </div>
                    </div>

                    <p className="text-sm text-[#475569] mt-5">Payment Frequency</p>
                    <p className="font-medium text-[#0F172A]">{contract.paymentFrequency}</p>
                </div>
            </div>
        </div>
    );
}