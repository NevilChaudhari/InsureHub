import { IconCaretLeftFilled, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
    back: () => void
    createAgent: (name: string, email: string, phone: number) => void
}

export default function CreateNewAgentUI({ back, createAgent }: Props) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState<number | null>(null)

    const clearData = () => {
        setEmail('')
        setName('')
        setPhone(null)
    }

    return (
        <div className="w-full h-full bg-[#F8FAFC]">
            <div>
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center justify-center gap-5">
                        <div className="flex items-center justify-center w-20 h-20 text-[#2563EB] bg-[#DBEAFE] rounded-md">
                            <IconUser stroke={2} size={50} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-[#475569]">Agents {'>'} <label className="font-semibold">Add New Agent</label></label>
                            <label className="text-3xl font-bold text-[#0F172A]">Create New Agent</label>
                            <label className="text-[#94A3B8]">Add a new agent to your organization</label>
                        </div>
                    </div>

                    <div onClick={back} className="flex items-center justify-center rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#3B82F6] hover:text-white cursor-pointer w-45 h-13 text-sm text-[#475569]">
                        <IconCaretLeftFilled />
                        Back to Agents
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                    {/* Personal Information */}
                    <section className="p-8 flex flex-col gap-5">
                        <label className="text-2xl font-semibold text-[#0F172A]">
                            Personal Information
                        </label>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {/* Name */}
                            <div>
                                <div className="flex gap-2">
                                    <label className="text-md text-[#021B3A]">Name</label>
                                    <label className="text-md text-[#DC2626]">*</label>
                                </div>
                                <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                    <IconUser stroke={2} className="text-[#94A3B8]" size={28} />
                                    <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="Email" id="email" placeholder="Enter your name" className="w-full h-full focus:outline-none focus:ring-0" />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <div className="flex gap-2">
                                    <label className="text-md text-[#021B3A]">Email</label>
                                    <label className="text-md text-[#DC2626]">*</label>
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
                                    <label className="text-md text-[#DC2626]">*</label>
                                </div>
                                <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                    <IconPhone stroke={2} className="text-[#94A3B8]" size={28} />
                                    <input value={phone!} onChange={(e) => { setPhone(Number(e.target.value)) }} maxLength={10} type="tel" name="Email" id="email" placeholder="1234567890" className="w-full h-full focus:outline-none focus:ring-0" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="flex gap-6 p-8">
                        <div className="cursor-pointer rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-50">Cancel</div>

                        <div onClick={() => { clearData(); createAgent(name, email, phone!) }} className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700" >Create Agent</div>
                    </div>
                </div>
            </div>
        </div >
    );
}