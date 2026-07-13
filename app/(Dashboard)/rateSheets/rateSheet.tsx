'use client'

import {
    IconPlusFilled,
    IconDotsFilled,
    IconCaretLeftFilled,
    IconCaretRightFilled,
    IconFilter,
    IconRefresh,
    IconFileDescription,
    IconChartBar,
    IconCircleCheckFilled,
    IconCircleXFilled,
} from "@tabler/icons-react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"

// ─── Types ───────────────────────────────────────────────────────────────────

interface RateSheet {
    ratesheetId: string
    contractId: string
    dealer: string
    agent: string
    claimReserve: number
    gst: number
    processingFee: number
}

type Props = {
    rateSheets: RateSheet[]
    totalRateSheets: number
    totalActive: number
    totalInactive: number
}

const PAGE_SIZE = 10

// ─── Component ───────────────────────────────────────────────────────────────

export default function RateSheetUI({
    rateSheets,
    totalRateSheets,
    totalActive,
    totalInactive,
}: Props) {

    const [activePage, setActivePage] = useState(0)
    const [selectedSheet, setSelectedSheet] = useState<RateSheet | null>(rateSheets[0] ?? null)
    const [filterDealer, setFilterDealer] = useState("")
    const [filterAgent, setFilterAgent] = useState("")
    const [filteredSheets, setFilteredSheets] = useState<RateSheet[]>(rateSheets)

    const pages = Math.ceil(filteredSheets.length / PAGE_SIZE)
    const pageData = filteredSheets.slice(activePage * PAGE_SIZE, activePage * PAGE_SIZE + PAGE_SIZE)

    const applyFilter = () => {
        let result = [...rateSheets]
        if (filterDealer) result = result.filter(r => r.dealer.toLowerCase().includes(filterDealer.toLowerCase()))
        if (filterAgent)  result = result.filter(r => r.agent.toLowerCase().includes(filterAgent.toLowerCase()))
        setFilteredSheets(result)
        setActivePage(0)
    }

    const handleReset = () => {
        setFilterDealer("")
        setFilterAgent("")
        setFilteredSheets(rateSheets)
        setActivePage(0)
    }

    return (
        <div className="flex flex-col flex-1 gap-10 pb-10">

            {/* ── Stats Cards ─────────────────────────────────────────────── */}
            <div className="flex gap-10">
                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Total Rate Sheets</label>
                        <label className="text-[#0F172A] font-bold text-2xl">{totalRateSheets}</label>
                    </div>
                    <div className="rounded-xl bg-[#DBEAFE] w-13 h-13 flex items-center justify-center text-[#2563EB]">
                        <IconFileDescription size={30} />
                    </div>
                </div>

                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Active Rate Sheets</label>
                        <label className="text-[#16A34A] font-bold text-2xl">{totalActive}</label>
                    </div>
                    <div className="rounded-xl bg-[#DCFCE7] w-13 h-13 flex items-center justify-center text-[#16A34A]">
                        <IconCircleCheckFilled size={30} />
                    </div>
                </div>

                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Inactive Rate Sheets</label>
                        <label className="text-[#DC2626] font-bold text-2xl">{totalInactive}</label>
                    </div>
                    <div className="rounded-xl bg-[#FEE2E2] w-13 h-13 flex items-center justify-center text-[#DC2626]">
                        <IconCircleXFilled size={30} />
                    </div>
                </div>
            </div>

            {/* ── Main Content Row ─────────────────────────────────────────── */}
            <div className="flex gap-5">

                {/* ── Left: Table Panel ──────────────────────────────────── */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

                    {/* Filter + Add Bar */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-100 flex-wrap">
                        <input
                            type="text"
                            placeholder="Search by dealer..."
                            value={filterDealer}
                            onChange={(e) => setFilterDealer(e.target.value)}
                            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 min-w-40"
                        />
                        <input
                            type="text"
                            placeholder="Search by agent..."
                            value={filterAgent}
                            onChange={(e) => setFilterAgent(e.target.value)}
                            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 min-w-40"
                        />
                        <div
                            onClick={applyFilter}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer select-none"
                        >
                            <IconFilter size={16} />
                            Filter
                        </div>
                        <div
                            onClick={handleReset}
                            className="flex items-center gap-2 border border-[#E2E8F0] text-[#0F172A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#F8FAFC] transition-colors cursor-pointer select-none"
                        >
                            <IconRefresh size={16} />
                            Reset
                        </div>

                        <div className="flex-1" />

                        <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer select-none">
                            <IconPlusFilled size={16} />
                            Add Rate Sheet
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Rate Sheet ID</th>
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Contract ID</th>
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Dealer</th>
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Agent</th>
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Claim Reserve</th>
                                    <th className="h-10 min-w-25 text-start px-5 font-semibold text-[#0F172A]">GST</th>
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Processing Fee</th>
                                    <th className="h-10 min-w-25 text-start px-5 font-semibold text-[#0F172A]">Actions</th>
                                </tr>
                            </thead>

                            {rateSheets.length === 0 ? (
                                <tbody>
                                    {[...Array(5)].map((_, index) => (
                                        <tr key={index} className="border-b border-gray-50">
                                            <td className="px-5 py-3"><Skeleton width={80} /></td>
                                            <td className="px-5 py-3"><Skeleton width={80} /></td>
                                            <td className="px-5 py-3"><Skeleton width={100} /></td>
                                            <td className="px-5 py-3"><Skeleton width={100} /></td>
                                            <td className="px-5 py-3"><Skeleton width={80} /></td>
                                            <td className="px-5 py-3"><Skeleton width={60} /></td>
                                            <td className="px-5 py-3"><Skeleton width={80} /></td>
                                            <td className="px-5 py-3"><Skeleton width={40} height={32} borderRadius={6} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    {pageData.map((sheet) => (
                                        <tr
                                            key={sheet.ratesheetId}
                                            onClick={() => setSelectedSheet(sheet)}
                                            className={`border-b border-gray-50 font-medium text-[#0F172A] cursor-pointer transition-colors ${
                                                selectedSheet?.ratesheetId === sheet.ratesheetId
                                                    ? "bg-[#EFF6FF]"
                                                    : "hover:bg-[#F8FAFC]"
                                            }`}
                                        >
                                            <td className="px-5 py-3">{sheet.ratesheetId}</td>
                                            <td className="px-5 py-3">{sheet.contractId}</td>
                                            <td className="px-5 py-3">{sheet.dealer}</td>
                                            <td className="px-5 py-3">{sheet.agent}</td>
                                            <td className="px-5 py-3 text-[#2563EB] font-bold">{sheet.claimReserve.toLocaleString()}</td>
                                            <td className="px-5 py-3">{sheet.gst.toLocaleString()}</td>
                                            <td className="px-5 py-3">{sheet.processingFee.toLocaleString()}</td>
                                            <td className="px-5 py-3">
                                                <div className="cursor-pointer hover:bg-[#F1F5F9] w-10 h-8 border border-[#CBD5E1] rounded-md flex items-center justify-center">
                                                    <IconDotsFilled size={18} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex place-content-between">
                        <div className="px-5 py-3 text-sm flex items-center min-w-100">
                            {`Showing 1 to ${filteredSheets.length} of ${filteredSheets.length} entries`}
                        </div>

                        <div className="px-5 py-3 text-sm flex gap-2">
                            {activePage > 0 && (
                                <div
                                    onClick={() => setActivePage(activePage - 1)}
                                    className="bg-transparent text-black cursor-pointer hover:bg-[#F1F5F9] flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold"
                                >
                                    <IconCaretLeftFilled />
                                </div>
                            )}

                            <div className="flex overflow-x-hidden max-w-200 gap-1">
                                {Array.from({ length: pages }, (_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActivePage(i)}
                                        className={`${activePage === i ? "bg-[#2563EB] text-white" : "bg-transparent text-black"} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>

                            {activePage < pages - 1 && (
                                <div
                                    onClick={() => setActivePage(activePage + 1)}
                                    className="bg-transparent text-black cursor-pointer hover:bg-[#F1F5F9] flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold"
                                >
                                    <IconCaretRightFilled />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Right: Details Panel ──────────────────────────────── */}
                <div className="w-72 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden flex-shrink-0">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <span className="text-[#0F172A] font-semibold text-sm">Rate Sheet Details</span>
                    </div>

                    {selectedSheet ? (
                        <div className="flex flex-col flex-1 px-5 py-4 gap-5">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Rate Sheet ID</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.ratesheetId}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Contract ID</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.contractId}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Dealer</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.dealer}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Agent</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.agent}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Claim Reserve</span>
                                <span className="text-sm text-[#2563EB] font-bold">{selectedSheet.claimReserve.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">GST</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.gst.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Processing Fee</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.processingFee.toLocaleString()}</span>
                            </div>

                            <div className="flex-1" />

                            <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer justify-center select-none">
                                <IconChartBar size={16} />
                                View Rate Sheet Breakdown
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col flex-1 items-center justify-center gap-3 px-5 py-10 text-center">
                            <div className="rounded-xl bg-[#DBEAFE] w-13 h-13 flex items-center justify-center text-[#2563EB]">
                                <IconFileDescription size={28} />
                            </div>
                            <span className="text-sm text-[#64748B] font-medium">
                                Select a rate sheet to view details
                            </span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}