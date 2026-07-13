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
import { format } from "date-fns"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"

// ─── Types ───────────────────────────────────────────────────────────────────

interface RateSheet {
    id: string
    name: string
    product: string
    effectiveFrom: string
    effectiveTo: string
    status: "Active" | "Inactive"
    description: string
    createdOn: string
    createdBy: string
}

type Props = {
    addRateSheet: () => void
    rateSheets: RateSheet[]
    totalRateSheets: number
    totalActive: number
    totalInactive: number
    getRateSheets: (start: number, end: number) => void
    products?: string[]
}

const PAGE_SIZE = 10

// ─── Component ───────────────────────────────────────────────────────────────

export default function RateSheetUI({
    addRateSheet,
    rateSheets,
    totalRateSheets,
    totalActive,
    totalInactive,
    products = [],
}: Props) {

    const [activePage, setActivePage] = useState(0)
    const [selectedSheet, setSelectedSheet] = useState<RateSheet | null>(null)
    const [filterProduct, setFilterProduct] = useState("All Products")
    const [filterFrom, setFilterFrom] = useState("")
    const [filterTo, setFilterTo] = useState("")
    const [filteredSheets, setFilteredSheets] = useState<RateSheet[]>(rateSheets)

    // Auto-select first row on mount
    useEffect(() => {
        if (rateSheets.length > 0) {
            setSelectedSheet(rateSheets[0])
            setFilteredSheets(rateSheets)
        }
    }, [rateSheets])

    // Apply filters
    const applyFilter = () => {
        let result = [...rateSheets]
        if (filterProduct !== "All Products") {
            result = result.filter(r => r.product === filterProduct)
        }
        if (filterFrom) {
            result = result.filter(r => r.effectiveFrom >= filterFrom)
        }
        if (filterTo) {
            result = result.filter(r => r.effectiveTo <= filterTo)
        }
        setFilteredSheets(result)
        setActivePage(0)
    }

    const handleReset = () => {
        setFilterProduct("All Products")
        setFilterFrom("")
        setFilterTo("")
        setFilteredSheets(rateSheets)
        setActivePage(0)
    }

    // Local pagination slice
    const pages = Math.ceil(filteredSheets.length / PAGE_SIZE)
    const pageData = filteredSheets.slice(activePage * PAGE_SIZE, activePage * PAGE_SIZE + PAGE_SIZE)
    const allProducts = ["All Products", ...Array.from(new Set(products))]

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

                    {/* Filter Bar */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-100 flex-wrap">
                        <div className="flex flex-col gap-1">
                            <p>Product</p>
                            <select
                                value={filterProduct}
                                onChange={(e) => setFilterProduct(e.target.value)}
                                className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 min-w-35 cursor-pointer"
                            >
                                {allProducts.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Effective From</p>
                            <input
                                type="date"
                                value={filterFrom}
                                onChange={(e) => setFilterFrom(e.target.value)}
                                className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Effective To</p>
                            <input
                                type="date"
                                value={filterTo}
                                onChange={(e) => setFilterTo(e.target.value)}
                                className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            />
                        </div>

                        <div
                            onClick={applyFilter}
                            className="flex items-center gap-2 bg-blue-600 text-white mt-7 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer select-none"
                        >
                            <IconFilter size={16} />
                            Filter
                        </div>

                        <div
                            onClick={handleReset}
                            className="flex items-center gap-2 border border-[#E2E8F0] text-[#0F172A] mt-7 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#F8FAFC] transition-colors cursor-pointer select-none"
                        >
                            <IconRefresh size={16} />
                            Reset
                        </div>

                        <div className="flex-1" />

                        <div
                            onClick={() => addRateSheet()}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer select-none"
                        >
                            <IconPlusFilled size={16} />
                            Add Rate Sheet
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="h-10 min-w-50 text-start px-5 font-semibold text-[#0F172A]">Rate Sheet Name</th>
                                    <th className="h-10 min-w-40 text-start px-5 font-semibold text-[#0F172A]">Product</th>
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Effective From</th>
                                    <th className="h-10 min-w-35 text-start px-5 font-semibold text-[#0F172A]">Effective To</th>
                                    <th className="h-10 min-w-25 text-start px-5 font-semibold text-[#0F172A]">Status</th>
                                    <th className="h-10 min-w-25 text-start px-5 font-semibold text-[#0F172A]">Actions</th>
                                </tr>
                            </thead>

                            {rateSheets.length === 0 ? (
                                <tbody>
                                    {[...Array(6)].map((_, index) => (
                                        <tr key={index} className="border-b border-gray-50">
                                            <td className="px-5 py-3"><Skeleton width={160} /></td>
                                            <td className="px-5 py-3"><Skeleton width={120} /></td>
                                            <td className="px-5 py-3"><Skeleton width={90} /></td>
                                            <td className="px-5 py-3"><Skeleton width={90} /></td>
                                            <td className="px-5 py-3"><Skeleton width={55} height={28} borderRadius={6} /></td>
                                            <td className="px-5 py-3"><Skeleton width={40} height={32} borderRadius={6} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    {pageData.map((sheet) => (
                                        <tr
                                            key={sheet.id}
                                            onClick={() => setSelectedSheet(sheet)}
                                            className={`border-b border-gray-50 font-medium text-[#0F172A] cursor-pointer transition-colors ${
                                                selectedSheet?.id === sheet.id ? "bg-[#EFF6FF]" : "hover:bg-[#F8FAFC]"
                                            }`}
                                        >
                                            <td className="px-5 py-3">{sheet.name}</td>
                                            <td className="px-5 py-3">{sheet.product}</td>
                                            <td className="px-5 py-3">
                                                {sheet.effectiveFrom ? format(new Date(sheet.effectiveFrom), "MMM dd, yyyy") : "—"}
                                            </td>
                                            <td className="px-5 py-3">
                                                {sheet.effectiveTo ? format(new Date(sheet.effectiveTo), "MMM dd, yyyy") : "—"}
                                            </td>
                                            <td className="px-5 py-3">
                                                {sheet.status === "Active" ? (
                                                    <div className="flex w-17 h-7 items-center justify-center rounded-md bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold">
                                                        Active
                                                    </div>
                                                ) : (
                                                    <div className="flex w-17 h-7 items-center justify-center rounded-md bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold">
                                                        Inactive
                                                    </div>
                                                )}
                                            </td>
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
                            {filteredSheets.length > PAGE_SIZE
                                ? `Showing ${activePage * PAGE_SIZE + 1} to ${Math.min(filteredSheets.length, activePage * PAGE_SIZE + PAGE_SIZE)} of ${filteredSheets.length} entries`
                                : `Showing 1 to ${filteredSheets.length} of ${filteredSheets.length} entries`}
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
                                {pages <= 3
                                    ? Array.from({ length: pages }, (_, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActivePage(i)}
                                            className={`${activePage === i ? "bg-[#2563EB] text-white" : "bg-transparent text-black"} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                        >
                                            {i + 1}
                                        </div>
                                    ))
                                    : (
                                        <div className="flex gap-1">
                                            {activePage >= 3 && (
                                                <div
                                                    onClick={() => setActivePage(0)}
                                                    className={`px-2 ${activePage === 0 ? "bg-[#2563EB] text-white" : "bg-transparent text-black"} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                                >
                                                    1
                                                </div>
                                            )}
                                            {activePage < 3 && Array.from({ length: 3 }, (_, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => setActivePage(i)}
                                                    className={`px-2 ${activePage === i ? "bg-[#2563EB] text-white" : "bg-transparent text-black"} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                                >
                                                    {i + 1}
                                                </div>
                                            ))}
                                            <div className="bg-transparent text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold">
                                                <IconDotsFilled />
                                            </div>
                                            {activePage >= 3 && activePage <= pages - 4 && (
                                                <div className="flex gap-1">
                                                    <div onClick={() => setActivePage(activePage - 1)} className="px-2 bg-transparent text-black cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold">
                                                        {activePage}
                                                    </div>
                                                    <div className="px-2 bg-[#2563EB] text-white flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold">
                                                        {activePage + 1}
                                                    </div>
                                                    <div onClick={() => setActivePage(activePage + 1)} className="px-2 bg-transparent text-black cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold">
                                                        {activePage + 2}
                                                    </div>
                                                </div>
                                            )}
                                            {activePage >= 3 && activePage <= pages - 4 && (
                                                <div className="bg-transparent text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold">
                                                    <IconDotsFilled />
                                                </div>
                                            )}
                                            {activePage > pages - 4 && Array.from({ length: 3 }, (_, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => setActivePage(pages - 3 + i)}
                                                    className={`px-2 ${activePage === pages - 3 + i ? "bg-[#2563EB] text-white" : "bg-transparent text-black"} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                                >
                                                    {pages - 2 + i}
                                                </div>
                                            ))}
                                            {activePage <= pages - 4 && (
                                                <div
                                                    onClick={() => setActivePage(pages - 1)}
                                                    className={`px-2 ${activePage === pages - 1 ? "bg-[#2563EB] text-white" : "bg-transparent text-black"} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                                >
                                                    {pages}
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
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
                                <span className="text-xs text-[#64748B] font-medium">Rate Sheet Name</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.name}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Product</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.product}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Effective Period</span>
                                <span className="text-sm text-[#0F172A] font-semibold">
                                    {selectedSheet.effectiveFrom && selectedSheet.effectiveTo
                                        ? `${format(new Date(selectedSheet.effectiveFrom), "MMM dd, yyyy")} to ${format(new Date(selectedSheet.effectiveTo), "MMM dd, yyyy")}`
                                        : "—"}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Description</span>
                                <span className="text-sm text-[#0F172A]">{selectedSheet.description || "—"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Created On</span>
                                <span className="text-sm text-[#0F172A] font-semibold">
                                    {selectedSheet.createdOn
                                        ? format(new Date(selectedSheet.createdOn), "MMM dd, yyyy hh:mm a")
                                        : "—"}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-[#64748B] font-medium">Created By</span>
                                <span className="text-sm text-[#0F172A] font-semibold">{selectedSheet.createdBy || "—"}</span>
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