'use client'

import { useState } from "react"
import RateSheetUI from "./rateSheet"

interface RateSheet {
    ratesheetId: string
    contractId: string
    dealer: string
    agent: string
    claimReserve: number
    gst: number
    processingFee: number
}

const MOCK_RATE_SHEETS: RateSheet = {
    ratesheetId: "1",
    contractId: "C-001",
    dealer: "Dealer A",
    agent: "Agent X",
    claimReserve: 10000,
    gst: 500,
    processingFee: 200
}

const totalRateSheets = 0
const totalActive     = 2
const totalInactive   = 1

export default function RateSheets() {
    const [rateSheets] = useState<RateSheet[]>([MOCK_RATE_SHEETS])

    return (
        <div className="relative flex flex-col w-full h-full">
            <RateSheetUI
                rateSheets={rateSheets}
                totalRateSheets={totalRateSheets}
                totalActive={totalActive}
                totalInactive={totalInactive}
            />
        </div>
    )
}