'use client'

import { useState } from "react"
import RateSheetUI from "./rateSheet"

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

// ── Static data matching the image ────────────────────────────────────────────
const MOCK_RATE_SHEETS: RateSheet[] = [
    {
        id: "1",
        name: "Car Rate Sheet 2024",
        product: "Comprehensive Plan",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2024-12-31",
        status: "Active",
        description: "Standard rate sheet for car comprehensive insurance policies.",
        createdOn: "2024-01-01T10:30:00",
        createdBy: "Admin User",
    },
    {
        id: "2",
        name: "TP Liability 2024",
        product: "Third Party Liability",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2024-12-31",
        status: "Active",
        description: "Rate sheet for third party liability coverage.",
        createdOn: "2024-01-01T11:00:00",
        createdBy: "Admin User",
    },
    {
        id: "3",
        name: "Bike Rate Sheet 2024",
        product: "Comprehensive Plan",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2024-12-31",
        status: "Active",
        description: "Standard rate sheet for bike comprehensive insurance policies.",
        createdOn: "2024-01-02T09:15:00",
        createdBy: "Admin User",
    },
    {
        id: "4",
        name: "Health Rate Sheet 2024",
        product: "Health Protector",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2024-12-31",
        status: "Active",
        description: "Rate sheet for health protection and medical coverage.",
        createdOn: "2024-01-02T10:00:00",
        createdBy: "Admin User",
    },
    {
        id: "5",
        name: "Travel Rate Sheet 2024",
        product: "Travel Secure",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2024-12-31",
        status: "Active",
        description: "Rate sheet for travel insurance and trip cancellation coverage.",
        createdOn: "2024-01-02T10:30:00",
        createdBy: "Admin User",
    },
    {
        id: "6",
        name: "Add-on Rate Sheet 2024",
        product: "All Add-ons",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2024-12-31",
        status: "Inactive",
        description: "Rate sheet covering all available add-on packages.",
        createdOn: "2024-01-02T11:00:00",
        createdBy: "Admin User",
    },
]

const PRODUCTS = [
    "Comprehensive Plan",
    "Third Party Liability",
    "Health Protector",
    "Travel Secure",
    "All Add-ons",
]

// ─────────────────────────────────────────────────────────────────────────────

export default function RateSheets() {

    const [rateSheets] = useState<RateSheet[]>(MOCK_RATE_SHEETS)

    const totalRateSheets = MOCK_RATE_SHEETS.length
    const totalActive     = MOCK_RATE_SHEETS.filter(r => r.status === "Active").length
    const totalInactive   = MOCK_RATE_SHEETS.filter(r => r.status === "Inactive").length

    // No-op: pagination is handled inside RateSheetUI with local slice
    const getRateSheets = (_start: number, _end: number) => {}

    const addRateSheet = () => {
        // Wire up modal / create page here when ready
        console.log("Add Rate Sheet")
    }

    return (
        <div className="relative flex flex-col w-full h-full">
            <RateSheetUI
                addRateSheet={addRateSheet}
                rateSheets={rateSheets}
                totalRateSheets={totalRateSheets}
                totalActive={totalActive}
                totalInactive={totalInactive}
                getRateSheets={getRateSheets}
                products={PRODUCTS}
            />
        </div>
    )
}