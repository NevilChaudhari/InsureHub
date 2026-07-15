'use client'

import { IconUserFilled, IconPlusFilled, IconDotsFilled, IconCaretLeftFilled, IconCaretRightFilled, IconFileAnalytics, IconCoin, IconFileDescription } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";


interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

type Props = {
    customers: Customer[]
    totalCustomers: number
    getCustomers: (start: number, end: number) => void
    selectCustomer: (customer: Customer) => void
}

export default function CustomersListUI({ customers, totalCustomers, getCustomers, selectCustomer }: Props) {

    const [pages, setPages] = useState(0)
    const [activePage, setActivePage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const calculatePages = () => {
            setPages(Math.ceil(totalCustomers / 10))
        }

        calculatePages()
    }, [totalCustomers])

    useEffect(() => {
        setLoading(true)
        getCustomers(activePage * 10 + 1, activePage * 10 + 10)
    }, [activePage])

    useEffect(() => {
        setLoading(false)
        console.log("agents updated in UI", customers);
    }, [customers]);

    return (
        <div className="flex flex-col gap-5 pb-10">

            <div className="bg-white w-full rounded-xl border border-gray-100 shadow-sm overflow-hidden h-auto self-start">

                {/* Table Data */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="h-10 min-w-90 text-start px-5">Id</th>
                                <th className="h-10 min-w-90 text-start px-5">Name</th>
                                <th className="h-10 min-w-35 text-start px-5">Email</th>
                                <th className="h-10 min-w-35 text-start px-5">Phone</th>
                                <th className="h-10 min-w-35 text-start px-5">Address</th>
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
                                    {customers
                                        .map((customer) => {
                                            return (
                                                <tr onClick={() => selectCustomer(customer)} key={customer.id} className={`border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center`}>
                                                    <td className="px-5 py-3">{customer.id}</td>
                                                    <td className="px-5 py-3">{customer.name}</td>
                                                    <td className="px-5 py-3">{customer.email}</td>
                                                    <td className="px-5 py-3">{customer.phone}</td>
                                                    <td className="px-5 py-3">{customer.address}</td>
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
                        {totalCustomers > 10 ? `Showing ${activePage * 10 + 1} to ${totalCustomers < (activePage * 10 + 10) ? (totalCustomers) : (activePage * 10 + 10)} out of ${totalCustomers}` : `Showing ${totalCustomers} out of ${totalCustomers}`}
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