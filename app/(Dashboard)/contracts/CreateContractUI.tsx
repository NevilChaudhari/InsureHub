import { IconCalendar, IconCalendarEvent, IconCar, IconCaretLeftFilled, IconCaretRightFilled, IconChevronDownFilled, IconChevronRightFilled, IconCoin, IconFileDescription, IconInfoCircle, IconMail, IconMapPin, IconPhone, IconShieldCheck, IconSquareArrowRightFilled, IconUser, IconXFilled } from "@tabler/icons-react";
import { differenceInMonths } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
    back: () => void
    createContract: (name: string, email: string, phone: string, address: string, policType: string, vehicleNumber: string, vehicleModel: string, startDate: string, endDate: string, paymentFrequency: string, premiumAmmount: number) => void
}

export default function CreateContractUI({ back, createContract }: Props) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState<number | null>(0)
    const [address, setAddress] = useState('')
    const [plate, setPlate] = useState('')
    const [model, setModel] = useState('')
    const [plan, setPlan] = useState('Basic');
    const [payment, setPayment] = useState('Monthly');
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [premiumAmmount, setPremiumAmmount] = useState(1234);
    const tax = (premiumAmmount * 18) / 100;
    const total = tax + premiumAmmount;
    const contractPeriod = Number.isNaN((differenceInMonths(endDate, startDate))) ? '0' : `${differenceInMonths(endDate, startDate)}`;

    useEffect(() => {
        if (plan === 'Basic') {
            setPremiumAmmount(4000)
        }
        if (plan === 'Standard') {
            setPremiumAmmount(9000)
        }
        if (plan === 'Premium') {
            setPremiumAmmount(14999)
        }
    }, [plan])

    return (
        <div className="w-full h-full bg-[#F8FAFC]">
            <div>
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center justify-center gap-5">
                        <div className="flex items-center justify-center w-15 h-15 text-[#2563EB] bg-[#DBEAFE] rounded-md">
                            <IconFileDescription stroke={2} size={40} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-2xl font-bold text-[#0F172A]">Create New Contract</label>
                            <label className="text-[#94A3B8] text-sm">Enter contract details to create a new insurance contract</label>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div onClick={back} className="flex items-center justify-center gap-2 font-semibold rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#FEE2E2] hover:text-[#DC2626] cursor-pointer px-5 h-13 text-sm text-[#475569]">
                            <IconXFilled />
                            Cancel
                        </div>
                        <div onClick={() => { createContract(name, email, phone!.toString(), address, plan, plate, model, new Date(startDate).toISOString(), new Date(endDate).toISOString(), payment, total) }} className="flex items-center justify-center gap-2 font-semibold rounded-lg border border-[#CBD5E1] bg-[#DBEAFE] hover:bg-[#3B82F6] hover:text-white cursor-pointer px-5 h-13 text-sm text-[#475569]">
                            Save & Continue
                            <IconCaretRightFilled />
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-5">
                    {/* Data Entry */}
                    <div className="overflow-hidden w-[70%] rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                        <div className="p-8 flex flex-col gap-5">

                            {/* Customer Information */}
                            <label className="text-2xl font-semibold text-[#0F172A] flex items-center gap-5">
                                <label className="bg-[#2563EB] text-white w-10 h-10 rounded-full flex items-center justify-center">1</label>
                                <label>Customer Information</label>
                            </label>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                                {/* Name */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Name</label>
                                    </div>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <IconUser stroke={2} className="text-[#94A3B8]" size={28} />
                                        <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="Email" id="email" placeholder="Enter name" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Email</label>
                                    </div>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <IconMail stroke={2} className="text-[#94A3B8]" size={28} />
                                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="Email" id="email" placeholder="Enter your email" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </div>

                                {/* Number */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Phone</label>
                                    </div>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <IconPhone stroke={2} className="text-[#94A3B8]" size={28} />
                                        <input value={phone!} onChange={(e) => { setPhone(Number(e.target.value)) }} maxLength={10} type="tel" name="Email" id="email" placeholder="1234567890" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Address</label>
                                    </div>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <IconMapPin stroke={2} className="text-[#94A3B8]" size={28} />
                                        <input value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" name="Address" id="address" placeholder="Enter address" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full border-[#E5E7EB] border"></div>

                            {/* Policy Information */}
                            <label className="text-2xl font-semibold text-[#0F172A] flex items-center gap-5">
                                <label className="bg-[#2563EB] text-white w-10 h-10 rounded-full flex items-center justify-center">2</label>
                                <label>Policy Information</label>
                            </label>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                                {/* Policy Type */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Policy Type</label>
                                    </div>
                                    <div className="relative flex w-85 h-12">
                                        <select value={plan} onChange={(e) => setPlan(e.target.value)} className="w-full appearance-none rounded-md border border-[#94A3B8] bg-white px-4 py-2 text-sm text-black outline-none focus:border-0 focus:ring-1 focus:ring-[#94A3B8]">
                                            <option>Basic</option>
                                            <option>Standard</option>
                                            <option>Premium</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                            <IconChevronDownFilled />
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Number */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Vehicle Number</label>
                                    </div>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <IconCar stroke={2} className="text-[#94A3B8]" size={28} />
                                        <input value={plate} onChange={(e) => { setPlate(e.target.value) }} type="text" name="Address" id="address" placeholder="Enter vehicle number" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </div>

                                {/* Make & Model */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Make & Model</label>
                                    </div>
                                    <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                        <IconCar stroke={2} className="text-[#94A3B8]" size={28} />
                                        <input value={model} onChange={(e) => { setModel(e.target.value) }} type="text" name="Address" id="address" placeholder="Enter model" className="w-full h-full focus:outline-none focus:ring-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full border-[#E5E7EB] border"></div>

                            {/* Contract Information */}
                            <label className="text-2xl font-semibold text-[#0F172A] flex items-center gap-5">
                                <label className="bg-[#2563EB] text-white w-10 h-10 rounded-full flex items-center justify-center">3</label>
                                <label>Contract Details</label>
                            </label>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                                {/* Start Date */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Start Date</label>
                                    </div>
                                    <div className="relative flex w-85 h-12">
                                        <input id="date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border border-[#94A3B8] px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    </div>
                                </div>

                                {/* End Date */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">End Date</label>
                                    </div>
                                    <div className="relative flex w-85 h-12">
                                        <input id="date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-lg border border-[#94A3B8] px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    </div>
                                </div>
                                {/* Contract Period */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Contract Period</label>
                                    </div>
                                    <div className="flex items-center px-4 bg-[#f3f4f7] border border-[#94A3B8] w-85 h-12 rounded-md">
                                        {contractPeriod} Months
                                    </div>
                                </div>
                                {/* Payment Frequency */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Payment Frequency</label>
                                    </div>
                                    <div className="relative flex w-85 h-12">
                                        <select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full appearance-none rounded-md border border-[#94A3B8] bg-white px-4 py-2 text-sm text-black outline-none focus:border-0 focus:ring-1 focus:ring-[#94A3B8]">
                                            <option>Monthly</option>
                                            <option>Anually</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                            <IconChevronDownFilled />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="w-full border-[#E5E7EB] border"></div>

                            {/* Payment Information */}
                            <label className="text-2xl font-semibold text-[#0F172A] flex items-center gap-5">
                                <label className="bg-[#2563EB] text-white w-10 h-10 rounded-full flex items-center justify-center">4</label>
                                <label>Payment Details</label>
                            </label>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                                {/* Premium Ammount */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Premium Ammount</label>
                                    </div>
                                    <div className="flex items-center px-4 border border-[#94A3B8] bg-[#f3f4f7] h-12 rounded-md gap-3">
                                        <label className="text-[#16A34A] font-semibold text-xl">$</label>
                                        <label className="text-xl">{premiumAmmount}</label>
                                    </div>
                                </div>

                                {/* Tax Ammount */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Tax Ammount</label>
                                    </div>
                                    <div className="flex items-center px-4 border border-[#94A3B8] bg-[#f3f4f7] h-12 rounded-md gap-3">
                                        <label className="text-[#16A34A] font-semibold text-xl">$</label>
                                        <label className="text-xl">{tax}</label>
                                    </div>
                                </div>

                                {/* Total Ammount */}
                                <div>
                                    <div className="flex gap-2">
                                        <label className="text-md text-[#021B3A]">Total Ammount</label>
                                    </div>
                                    <div className="flex items-center px-4 border border-[#94A3B8] bg-[#f3f4f7] h-12 rounded-md gap-3">
                                        <label className="text-[#16A34A] font-semibold text-xl">$</label>
                                        <label className="text-xl">{total}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm w-[30%] px-5 py-5 flex flex-col gap-5 self-start">
                        <div className="text-[#2563EB] flex items-center justify-start font-bold text-xl gap-3">
                            <IconFileDescription stroke={2} size={40} />
                            <label className="text-black">Contract Summary</label>
                        </div>

                        {/* Customer Section */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-start gap-3">
                                <div className="flex items-center justify-center w-10 h-10 text-[#2563EB] bg-[#DBEAFE] rounded-xl">
                                    <IconUser stroke={2} size={25} />
                                </div>
                                <label className="text-black font-semibold">Customer</label>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">Name</label>
                                    <label className="pl-13 text-black text-sm">Email</label>
                                    <label className="pl-13 text-black text-sm">Phone</label>
                                </div>
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">{!name ? 'Empty' : name}</label>
                                    <label className="pl-13 text-black text-sm">{!email ? 'Empty' : email}</label>
                                    <label className="pl-13 text-black text-sm">{!phone ? 'Empty' : phone}</label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border-[#E5E7EB] border"></div>

                        {/* Policy Section */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-start gap-3">
                                <div className="flex items-center justify-center w-10 h-10 text-[#16A34A] bg-[#DCFCE7] rounded-xl">
                                    <IconShieldCheck stroke={2} size={25} />
                                </div>
                                <label className="text-black font-semibold">Policy Details</label>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">Policy Type</label>
                                    <label className="pl-13 text-black text-sm">Sub Type</label>
                                    <label className="pl-13 text-black text-sm">Vehicle</label>
                                </div>
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">{!plan ? 'Empty' : plan}</label>
                                    <label className="pl-13 text-black text-sm">{`{Sub Type}`}</label>
                                    <label className="pl-13 text-black text-sm">{!model ? 'Empty' : model}</label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border-[#E5E7EB] border"></div>

                        {/* Contract Section */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-start gap-3">
                                <div className="flex items-center justify-center w-10 h-10 text-[#7935f5] bg-[#f5ecff] rounded-xl">
                                    <IconCalendarEvent stroke={2} size={25} />
                                </div>
                                <label className="text-black font-semibold">Contract Details</label>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">Start Date</label>
                                    <label className="pl-13 text-black text-sm">End Date</label>
                                    <label className="pl-13 text-black text-sm">Period</label>
                                    <label className="pl-13 text-black text-sm">Payment Frequency</label>
                                </div>
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">{startDate === '' ? 'Empty' : startDate}</label>
                                    <label className="pl-13 text-black text-sm">{endDate === '' ? 'Empty' : endDate}</label>
                                    <label className="pl-13 text-black text-sm">{contractPeriod}</label>
                                    <label className="pl-13 text-black text-sm">{payment === '' ? 'Empty' : payment}</label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border-[#E5E7EB] border"></div>

                        {/* Payment Section */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-start gap-3">
                                <div className="flex items-center justify-center w-10 h-10 text-[#fe6800] bg-[#fef0dc] rounded-xl">
                                    <IconCoin stroke={2} size={25} />
                                </div>
                                <label className="text-black font-semibold">Payment Summary</label>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">Premium Ammount</label>
                                    <label className="pl-13 text-black text-sm">Taxes & Fees</label>
                                    <label className="pl-13 text-xl text-black font-semibold">Total Ammount</label>
                                </div>
                                <div className="flex flex-col">
                                    <label className="pl-13 text-black text-sm">{premiumAmmount}</label>
                                    <label className="pl-13 text-black text-sm">{tax}</label>
                                    <label className="pl-13 text-xl text-[#2563EB] font-semibold">{total}</label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border-[#E5E7EB] border"></div>

                        {/* Note */}
                        <div className="flex text-[#2563EB] border border-[#3B82F6] bg-[#DBEAFE] rounded-md p-3 text-sm gap-2">
                            <IconInfoCircle stroke={2} size={30} />
                            <label>Please review all the information carefully before creating the contract</label>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}