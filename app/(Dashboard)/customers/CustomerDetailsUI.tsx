'use client'

import { IconFileDescription, IconXFilled, IconChevronRightFilled, IconCaretLeftFilled, IconCopy, IconUser, IconCar, IconCalendarEvent, IconClock, IconCoin, IconPlusFilled, IconPencil, IconCheckFilled } from "@tabler/icons-react";
import { differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ContractDetailsUI from "../contracts/ContractDetailsUI";

interface props {
    customer: Customer
    contracts: Contract[]
    changeMode: () => void
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
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
}
export default function CustomerDetailsUI({ customer, contracts, changeMode }: props) {
    const [loading, setLoading] = useState(true)
    const [selectedContract, setSelectedContract] = useState<Contract>()

    useEffect(() => {
        if (contracts) {
            setLoading(false)
        }
    }, [contracts])

    return (
        <div className="w-full h-full bg-[#F8FAFC] flex flex-col gap-5">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center justify-center gap-5">
                    <div className="flex items-center justify-center w-15 h-15 text-[#2563EB] bg-[#DBEAFE] rounded-md">
                        <IconUser stroke={2} size={40} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-2xl font-bold text-[#0F172A]">Customer Details</label>
                        <label className="text-[#94A3B8] text-sm">Comprehensive Customer information and details</label>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div onClick={changeMode} className="flex items-center justify-center gap-2 font-semibold rounded-lg border border-[#CBD5E1] hover:bg-[#3B82F6] hover:text-white cursor-pointer px-5 h-13 text-sm text-[#475569]">
                        <IconCaretLeftFilled />
                        Back
                    </div>
                </div>
            </div>

            <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-6 flex place-content-between">
                {/* Contract */}
                <div className="px-6 py-2">
                    <label className="text-sm text-[#0F172A] mb-4">Name</label>

                    <div className="flex items-center gap-2 text-[#2563EB]">
                        <label className="font-semibold text-xs hover:underline cursor-pointer">{customer.name}</label>

                        <IconCopy stroke={2} className="cursor-pointer" />
                    </div>

                    <p className="text-sm text-[#475569] mt-5">Id</p>
                    <p className="font-medium text-[#0F172A]">{customer.id}</p>
                </div>
                <div className="border border-[#E5E7EB]" />


                {/* Customer */}
                <div className="px-6 py-2">
                    <label className="text-sm text-[#0F172A] mb-4">Phone</label>

                    <div className="flex items-center gap-2">
                        <IconUser stroke={2} className="text-[#0F172A]" />

                        <label className="font-semibold text-sm text-[#2563EB]">{customer.name}</label>
                    </div>

                    <p className="text-sm text-[#475569] mt-5">Email</p>
                    <p className="text-xs font-semibold text-[#0F172A]">{customer.email}</p>
                </div>

                <div className="border border-[#E5E7EB]" />

                {/* Policy */}
                <div className="px-6 py-2">
                    <label className="text-sm text-[#0F172A] mb-4">Total Contracts</label>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-sm">{contracts ? contracts.length : 0}</label>
                    </div>

                    <p className="text-sm text-[#475569] mt-5">Total Claims</p>
                    <p className="font-medium text-[#0F172A]">0</p>
                </div>
            </div >

            <div className="bg-white w-full rounded-xl border border-gray-100 shadow-sm overflow-hidden h-auto self-start">
                {/* Table Data */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="h-10 min-w-90 text-start px-5">Contract Id</th>
                                <th className="h-10 min-w-35 text-start px-5">Policy Type</th>
                                <th className="h-10 min-w-40 text-start px-5">Vehicle Number</th>
                                <th className="h-10 min-w-40 text-start px-5">Vehicle Model</th>
                                <th className="h-10 min-w-50 text-start px-5">Payment Frequency</th>
                                <th className="h-10 min-w-35 text-start px-5">Start Date</th>
                                <th className="h-10 min-w-35 text-start px-5">End Date</th>
                                <th className="h-10 min-w-50 text-start px-5">Premium Ammount</th>
                            </tr>
                        </thead>

                        {loading
                            ? (
                                <tbody>
                                    {[...Array(5)].map((_, index) => (
                                        <tr key={index} className="border-b border-gray-50">
                                            <td className="px-5 py-3">
                                                <Skeleton width={140} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={90} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={200} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={120} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton
                                                    width={70}
                                                    height={28}
                                                    borderRadius={6}
                                                />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={40} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={110} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                            : (
                                <tbody>
                                    {contracts
                                        .map((contract) => {
                                            return (
                                                <tr key={contract.id} className={`border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center`}>
                                                    <td className="px-5 py-3">{contract.id}</td>
                                                    <td className="px-5 py-3">{contract.policyType}</td>
                                                    <td className="px-5 py-3">{contract.vehicleNumber}</td>
                                                    <td className="px-5 py-3">{contract.vehicleModel}</td>
                                                    <td className="px-5 py-3">{contract.paymentFrequency}</td>
                                                    <td className="px-5 py-3">{format(new Date(contract.startDate), "MMM d, yyyy")}</td>
                                                    <td className="px-5 py-3">{format(new Date(contract.endDate), "MMM d, yyyy")}</td>
                                                    <td className="px-5 py-3 text-[#2563EB] font-bold">{contract.premiumAmmount}</td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
        </div >
    );
}