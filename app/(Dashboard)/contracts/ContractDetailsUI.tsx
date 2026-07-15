'use client'

import { IconFileDescription, IconXFilled, IconChevronRightFilled, IconCaretLeftFilled, IconCopy, IconUser, IconCar, IconCalendarEvent, IconClock, IconCoin, IconPlusFilled, IconPencil, IconCheckFilled } from "@tabler/icons-react";
import { differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";

interface props {
    contract: Contract
    changeModetoList: () => void
    updateRatesheet: (id: string, dealer: number, agent: number, claimReserve: number, processingFee: number) => void
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface Ratesheet {
    id: string;
    dealer: number;
    agent: number;
    claimReserve: number;
    gst: number;
    processingFee: number;
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
    ratesheet: Ratesheet;
}
export default function ContractDetailsUI({ contract, changeModetoList, updateRatesheet }: props) {

    // useEffect(() => {
    //     console.table(contract)
    // }, [contract])

    const [editRatesheet, setEditRatesheet] = useState<boolean>(false)
    const [dealer, setDealer] = useState<string>(contract.ratesheet.dealer.toString())
    const [agent, setAgent] = useState<string>(contract.ratesheet.agent.toString())
    const [claimReserve, setClaimReserve] = useState<string>(contract.ratesheet.claimReserve.toString())
    const [gst, setGST] = useState<string>(contract.ratesheet.gst.toString())
    const [processingFee, setProcessingFee] = useState<string>(contract.ratesheet.processingFee.toString())
    const [alert, setAlert] = useState<string>('')

    const toogleEditRatesheet = () => {
        setEditRatesheet(!editRatesheet)
    }

    const resetData = () => {
        setDealer(contract.ratesheet.dealer.toString())
        setAgent(contract.ratesheet.agent.toString())
        setClaimReserve(contract.ratesheet.claimReserve.toString())
        setGST(contract.ratesheet.gst.toString())
        setProcessingFee(contract.ratesheet.processingFee.toString())
    }

    useEffect(() => {
        setDealer(contract.ratesheet.dealer.toString())
        setAgent(contract.ratesheet.agent.toString())
        setClaimReserve(contract.ratesheet.claimReserve.toString())
        setGST(contract.ratesheet.gst.toString())
        setProcessingFee(contract.ratesheet.processingFee.toString())
    }, [contract.ratesheet.dealer, contract.ratesheet.agent, contract.ratesheet.claimReserve, contract.ratesheet.gst, contract.ratesheet.processingFee])

    useEffect(() => {
        checkRatesheet()
    }, [dealer, agent, claimReserve, processingFee])

    const checkRatesheet = () => {
        if ((Number(dealer) + Number(agent) + Number(claimReserve) + Number(processingFee)) > 42) {
            setAlert('Invalid Calculation total share of dealer, agent, claim reserve, and processing fee should be less than 42')
            return false;
        } else {
            setAlert('')
            return true;
        }
    }

    const changeRatesheet = () => {
        if (checkRatesheet()) {
            if (dealer !== contract.ratesheet.dealer.toString() || agent !== contract.ratesheet.agent.toString() || claimReserve !== contract.ratesheet.claimReserve.toString() || processingFee !== contract.ratesheet.processingFee.toString()) {
                updateRatesheet(contract.ratesheet.id, Number(dealer), Number(agent), Number(claimReserve), Number(processingFee))
                toogleEditRatesheet()
            }
        }
    }

    return (
        <div className="w-full h-full bg-[#F8FAFC] flex flex-col gap-5">
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
                        <p className="text-xs">{`${differenceInDays(contract.endDate, new Date())} days remaining`}</p>
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

            <div className="flex gap-5">

                <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-6 flex flex-col gap-10">
                    <label className="font-semibold text-xl">Policy Overview</label>

                    <div className="flex gap-10">
                        <div className="flex gap-5">
                            <div className="flex flex-col">
                                <label className="min-w-35">Insured Name</label>
                                <label className="min-w-35">Phone</label>
                                <label className="min-w-35">Email</label>
                                <label className="min-w-35">Address</label>
                            </div>
                            <div className="flex flex-col">
                                <label className="min-w-5">:</label>
                                <label className="min-w-5">:</label>
                                <label className="min-w-5">:</label>
                                <label className="min-w-5">:</label>
                            </div>
                            <div className="flex flex-col">
                                <label className="min-w-30 max-w-120">{contract.customers.name}</label>
                                <label className="min-w-30 max-w-120">{contract.customers.phone}</label>
                                <label className="min-w-30 max-w-120">{contract.customers.email}</label>
                                <label className="min-w-30 max-w-120">{contract.customers.address}</label>
                            </div>
                        </div>

                        <div className="border border-[#E5E7EB]" />

                        <div className="flex gap-5">
                            <div className="flex flex-col">
                                <label className="min-w-35">Vehicle Number</label>
                                <label className="min-w-35">Vehicle Model</label>
                            </div>
                            <div className="flex flex-col">
                                <label className="min-w-5">:</label>
                                <label className="min-w-5">:</label>
                            </div>
                            <div className="flex flex-col">
                                <label className="min-w-30">{contract.vehicleNumber}</label>
                                <label className="min-w-30">{contract.vehicleModel}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] rounded-2xl border border-[#E2E8F0] bg-white p-6 flex flex-col gap-10">
                    {`{chart}`}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-end p-4 border-b border-gray-100 gap-10">
                    {alert !== '' && (<div className="text-[#DC2626] text-sm">{alert}</div>)}
                    {!editRatesheet && (<div onClick={() => { toogleEditRatesheet() }} className="flex items-center justify-center cursor-pointer gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <IconPencil />
                        Edit Ratesheet
                    </div>)}
                    {editRatesheet && (<div className="flex gap-3">
                        <div onClick={() => { toogleEditRatesheet(); resetData() }} className="flex items-center justify-center gap-2 font-semibold rounded-lg border border-[#CBD5E1] bg-[#EF4444] hover:bg-[#DC2626] text-white cursor-pointer px-5 py-2 text-sm">
                            <IconXFilled />
                            Cancel
                        </div>
                        <div onClick={() => { changeRatesheet() }} className="flex items-center justify-center gap-2 font-semibold rounded-lg border border-[#CBD5E1] bg-[#22C55E] hover:bg-[#16A34A] text-white cursor-pointer px-5 py-2 text-sm">
                            <IconCheckFilled />
                            Save
                        </div>
                    </div>)}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="h-10 min-w-50 text-start px-5">Coverage Type</th>
                                <th className="h-10 min-w-50 text-start px-5">Base Rate (%)</th>
                                <th className="h-10 min-w-50 text-start px-5">Ammount (USD)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Base Premium */}
                            <tr className="border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center">
                                <td className="px-5 py-3">Base Premium</td>
                                <td className="px-5 py-3">{100 - Number(dealer) - Number(agent) - Number(claimReserve) - Number(gst) - Number(processingFee)}%</td>
                                <td className="px-5 py-3">${(Number(contract.premiumAmmount) * (100 - Number(dealer) - Number(agent) - Number(claimReserve) - Number(gst) - Number(processingFee)) / 100)}</td>
                            </tr>

                            {/* Dealer */}
                            <tr className="border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center">
                                <td className="px-5 py-3">Dealer</td>
                                {!editRatesheet && (<td className="px-5 py-3">{dealer}%</td>)}
                                {editRatesheet && (<td>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <input value={dealer} onChange={(e) => { setDealer(e.target.value) }} type="text" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </td>)}
                                <td className="px-5 py-3">${(Number(contract.premiumAmmount) * Number(dealer)) / 100}</td>
                            </tr>

                            {/* Agent */}
                            <tr className="border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center">
                                <td className="px-5 py-3">Agent</td>
                                {!editRatesheet && (<td className="px-5 py-3">{agent}%</td>)}
                                {editRatesheet && (<td>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <input value={agent} onChange={(e) => { setAgent(e.target.value) }} type="text" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </td>)}
                                <td className="px-5 py-3">${(Number(contract.premiumAmmount) * Number(agent)) / 100}</td>
                            </tr>

                            {/* Claim Reserve */}
                            <tr className="border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center">
                                <td className="px-5 py-3">Claim Reserve</td>
                                {!editRatesheet && (<td className="px-5 py-3">{claimReserve}%</td>)}
                                {editRatesheet && (<td>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <input value={claimReserve} onChange={(e) => { setClaimReserve(e.target.value) }} type="text" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </td>)}
                                <td className="px-5 py-3">${(Number(contract.premiumAmmount) * Number(claimReserve)) / 100}</td>
                            </tr>

                            {/* G.S.T. */}
                            <tr className="border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center">
                                <td className="px-5 py-3">G.S.T.</td>
                                <td className="px-5 py-3">{gst}%</td>
                                <td className="px-5 py-3">${(Number(contract.premiumAmmount) * Number(gst)) / 100}</td>
                            </tr>

                            {/* Processing Fee */}
                            <tr className="border-b border-gray-50 font-medium text-[#0F172A] hover:bg-[#E5E7EB] cursor-pointer items-center">
                                <td className="px-5 py-3">Processing Fee</td>
                                {!editRatesheet && (<td className="px-5 py-3">{processingFee}%</td>)}
                                {editRatesheet && (<td>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <input value={processingFee} onChange={(e) => { setProcessingFee(e.target.value) }} type="text" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </td>)}
                                <td className="px-5 py-3">${(Number(contract.premiumAmmount) * Number(processingFee)) / 100}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}