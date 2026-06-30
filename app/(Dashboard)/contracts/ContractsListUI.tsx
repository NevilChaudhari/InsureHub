'use client'

import { IconUserFilled, IconPlusFilled, IconDotsFilled, IconCaretLeftFilled, IconCaretRightFilled, IconFileAnalytics, IconCoin } from "@tabler/icons-react"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";


interface Customer {
    id: string;
    name: string;
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

type Props = {
    addAgent: () => void
    contract: Contract[]
    totalContracts: number
    totalPremium: number
    getContracts: (start: number, end: number) => void
    changeModetoDetails: (id: string) => void
}

export default function ContractsListUI({ addAgent, contract, totalContracts, totalPremium, getContracts, changeModetoDetails }: Props) {

    const [pages, setPages] = useState(0)
    const [activePage, setActivePage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const calculatePages = () => {
            setPages(Math.ceil(totalContracts / 10))
        }

        calculatePages()
    }, [totalContracts])

    useEffect(() => {
        setLoading(true)
        getContracts(activePage * 10 + 1, activePage * 10 + 10)
    }, [activePage])

    useEffect(() => {
        setLoading(false)
        console.log("agents updated in UI", contract);
    }, [contract]);

    return (
        <div className="flex flex-col flex-1 gap-10 pb-10">

            {/* Cards */}
            <div className="flex gap-10">
                {/* Card 1 */}
                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Total Contracts</label>
                        <label className="text-[#0F172A] font-bold text-2xl">{totalContracts}</label>
                    </div>

                    <div className="rounded-xl bg-[#DBEAFE] w-13 h-13 flex items-center justify-center text-[#2563EB]"><IconFileAnalytics size={30} /></div>
                </div>
                {/* Card 2 */}
                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Total Premium</label>
                        <label className="text-[#16A34A] font-bold text-2xl">{Number(totalPremium).toFixed(3)}</label>
                    </div>

                    <div className="rounded-xl bg-[#DCFCE7] w-13 h-13 flex items-center justify-center text-[#16A34A]"><IconCoin size={30} /></div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Add Agent */}
                <div className="flex items-center justify-end p-4 border-b border-gray-100">
                    <div onClick={() => { addAgent() }} className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <IconPlusFilled />
                        Create Contract
                    </div>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="h-10 text-start px-5">Contract Id</th>
                                <th className="h-10 text-start px-5">Customer Name</th>
                                <th className="h-10 text-start px-5">Policy Type</th>
                                <th className="h-10 text-start px-5">Vehicle Number</th>
                                <th className="h-10 text-start px-5">Vehicle Model</th>
                                <th className="h-10 text-start px-5">Payment Frequency</th>
                                <th className="h-10 text-start px-5">Start Date</th>
                                <th className="h-10 text-start px-5">End Date</th>
                                <th className="h-10 text-start px-5">Premium Ammount</th>
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

                                            <td className="px-5 py-3">
                                                <Skeleton
                                                    width={40}
                                                    height={32}
                                                    borderRadius={6}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                            : (
                                <tbody>
                                    {contract
                                        .map((contract) => {
                                            return (
                                                <tr key={contract.id} onClick={() => changeModetoDetails(contract.id)} className="border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center">
                                                    <td className="px-5 py-3">{contract.id}</td>
                                                    <td className="px-5 py-3">{contract.customers.name}</td>
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

                {/* Pagination */}
                <div className="flex place-content-between">
                    <div className="px-5 py-3 text-sm flex items-center min-w-100">
                        {totalContracts > 10 ? `Showing ${activePage * 10 + 1} to ${totalContracts < (activePage * 10 + 10) ? (totalContracts) : (activePage * 10 + 10)} out of ${totalContracts}` : `Showing ${totalContracts} out of ${totalContracts}`}
                    </div>

                    {/* Pages UI */}
                    <div className="px-5 py-3 text-sm flex gap-2">
                        {activePage > 0 && (<div onClick={() => { setActivePage(activePage - 1) }}
                            className={`bg-transparent text-black cursor-pointer hover:bg-[#F1F5F9] hover:text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                            <IconCaretLeftFilled />
                        </div>)}

                        <div className="flex overflow-x-hidden max-w-200 gap-1">
                            {pages <= 3
                                ? (Array.from({ length: pages }, (_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActivePage(i)}
                                        className={`${activePage === (i) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                    >
                                        {i + 1}
                                    </div>
                                )))
                                : <div className="flex gap-1">
                                    {activePage >= 3 && (
                                        <div onClick={() => { setActivePage(0) }}
                                            className={`px-2 ${activePage === (0) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                            1
                                        </div>
                                    )}
                                    {activePage < 3 && (Array.from({ length: 3 }, (_, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActivePage(i)}
                                            className={`px-2 ${activePage === (i) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                        >
                                            {i + 1}
                                        </div>
                                    )))}

                                    <div className={`bg-transparent text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                                        <IconDotsFilled />
                                    </div>

                                    {(activePage! >= 3 && activePage! <= (pages - 4)) && (
                                        <div className="flex gap-1">
                                            <div onClick={() => { setActivePage(activePage - 1) }} className={`px-2 ${activePage === (activePage - 1) ? 'px-2 bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                                {activePage}
                                            </div>
                                            <div className={`px-2 bg-[#2563EB] text-white cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                                {activePage + 1}
                                            </div>
                                            <div onClick={() => { setActivePage(activePage + 1) }} className={`px-2 ${activePage === (activePage + 1) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                                {activePage + 2}
                                            </div>
                                        </div>
                                    )}

                                    {(activePage! >= 3 && activePage! <= (pages - 4)) && (<div className={`bg-transparent text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                                        <IconDotsFilled />
                                    </div>)}

                                    {activePage > (pages - 4) && (Array.from({ length: 3 }, (_, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActivePage((pages - 3) + i)}
                                            className={`px-2 ${activePage === ((pages - 3) + i) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                        >
                                            {(pages - 2) + i}
                                        </div>
                                    )))}
                                    {activePage <= (pages - 4) && (
                                        <div onClick={() => { setActivePage(pages - 1) }}
                                            className={`px-2 ${activePage === (pages - 1) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                            {pages}
                                        </div>
                                    )}

                                </div>
                            }
                        </div>
                        {activePage < (pages - 1) && (<div onClick={() => { setActivePage(activePage + 1) }}
                            className={`bg-transparent text-black cursor-pointer hover:bg-[#F1F5F9] hover:text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                            <IconCaretRightFilled />
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}