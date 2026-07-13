'use client'

import { useEffect, useState } from "react"
import RatesheetListUI from "./RatesheetListUI"

interface RateSheet {
    id: string
    contractId: string
    dealer: number
    agent: number
    claimReserve: number
    gst: number
    processingFee: number
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
    ratesheet: RateSheet;
}

export default function RateSheets() {
    const [rateSheets, setRatesheets] = useState<Contract[]>([])
    const [totalContracts, setTotalContracts] = useState<number>(0)

    const getContracts = async (start: number, end: number) => {
        const res = await fetch('/api/ratesheet/getRatesheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start: start,
                end: end
            })
        })

        const data = await res.json()
        setRatesheets(data)
    }

    const getAllContracts = async () => {
        const res = await fetch('/api/contract/getAllContracts')
        const data = await res.json()
        setTotalContracts(data.count)
    }

    useEffect(() => {
        getAllContracts()
        getContracts(0, 10);
    }, [])

    return (
        <div className="relative flex flex-col w-full h-full">
            <RatesheetListUI contract={rateSheets} totalContracts={totalContracts} getContracts={getContracts} />
        </div>
    )
}