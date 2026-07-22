'use client'
import React, { useEffect, useState } from "react";
import ClaimsListUI from "./ClaimsListUI";

type active = 'List' | 'Details';
interface Claims {
    id: string
    contractId: string
    claimAmount: string
    status: string
    created_at: string
    Contract: Contract
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

const defaultContract = {
    id: 'loading...',
    policyType: 'loading...',
    vehicleNumber: 'loading...',
    vehicleModel: 'loading...',
    paymentFrequency: 0,
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    premiumAmmount: 'loading...',
    customerId: 'loading...',
}

const defaultClaim = {
    id: 'loading...',
    contractId: 'loading...',
    claimAmount: 'loading...',
    status: 'loading...',
    created_at: new Date().toISOString(),
    startDate: new Date().toISOString(),
    Contract: defaultContract,
}
export default function Claims() {
    const [active, setActive] = useState<active>('List')
    const [totalClaims, setTotalClaims] = useState<number>(0)
    const [claims, setClaims] = useState<Claims[]>([])


    const changeModetoDetails = () => {
        if (active === 'List') {
            setActive('Details')
        } else {
            setActive('List')
        }
    }

    const getClaims = async (start: number, end: number) => {
        const res = await fetch('/api/claims/getClaims', {
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
        setClaims(data)

        console.table(data);
        
    }

    const getTotalClaims = async () => {
        const res = await fetch('/api/claims/getTotalClaims')
        const data = await res.json()
        setTotalClaims(data.count)
    }

    useEffect(() => {
        getTotalClaims()
        getClaims(0, 10);
    }, [])

    return (
        <div className="">
            <ClaimsListUI changeModetoDetails={changeModetoDetails} getClaims={getClaims} totalClaims={totalClaims} claims={claims} />
        </div>
    )
}