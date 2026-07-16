'use client'

import { IconCheckFilled, IconGhost3, IconVersions } from "@tabler/icons-react";
import { useState } from "react";

interface Role {
    id: string,
    name: string
}

type Mode = 'permision' | 'users'

export default function RolesUI() {
    const [selectedRole, setSelectedRole] = useState<Role>()
    const [selectedMode, setSelectedMode] = useState<Mode>('permision')

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center justify-center gap-5">
                    <div className="flex items-center justify-center w-15 h-15 text-[#2563EB] bg-[#DBEAFE] rounded-md">
                        <IconVersions stroke={2} size={40} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-2xl font-bold text-[#0F172A]">Roles & Permisions</label>
                        <label className="text-[#94A3B8] text-sm">Manage Roles and their associated permisions</label>
                    </div>
                </div>
            </div>

            <div className="flex gap-5">
                {/* Roles */}
                <div className="flex flex-col gap-10 px-5 py-8 max-w-[25%] min-w-[25%] h-full border border-[#E2E8F0] rounded-lg bg-[#FFFFFF]">
                    <span className="font-semibold">Roles (6)</span>

                    {/* Roels Cards */}
                    <div className="flex flex-col">
                        <div className="flex border border-[#E2E8F0] rounded-md h-20 w-full items-center px-5 cursor-pointer group hover:bg-[#DBEAFE] gap-5 hover:border-[#2563EB]">
                            <div className="flex h-13 w-13 bg-[#DBEAFE] text-[#2563EB] rounded-full items-center justify-center">
                                <IconGhost3 stroke={2} size={30} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Role Name</span>
                                <span className="text-sm">99 Users</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col max-w-[74%] flex-1 gap-5">
                    <div className="flex flex-col gap-5 px-5 py-8 w-full h-full border border-[#E2E8F0] rounded-lg bg-[#FFFFFF]">
                        <span className="font-semibold">Role Details</span>
                        <div className="flex flex-col">
                            <span className="text-sm">Role Name</span>
                            <span className="font-semibold">Admin</span>
                        </div>
                    </div>

                    {/* Permisions */}
                    <div className="flex flex-col">
                        <div className="flex px-5 gap-2">
                            <div onClick={() => setSelectedMode('permision')} className={`${selectedMode === 'permision' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#94A3B8]'} flex px-3 border-b-2 hover:border-[#2563EB] font-semibold hover:text-[#2563EB] cursor-pointer`}>Permisions</div>
                            <div onClick={() => setSelectedMode('users')} className={`${selectedMode === 'users' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#94A3B8]'} flex px-3 border-b-2 hover:border-[#2563EB] font-semibold hover:text-[#2563EB] cursor-pointer`}>Users (99)</div>
                        </div>
                        <div className="flex flex-col gap-5 px-5 py-8 w-full h-full border border-[#E2E8F0] rounded-lg bg-[#FFFFFF]">
                            <span className="font-semibold">{selectedMode}</span>

                            <div className="bg-white w-auto rounded-xl border border-gray-100 shadow-sm overflow-hidden h-auto self-start">
                                <table className="w-auto text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/50">
                                            <th className="h-10 min-w-50 text-start px-5">Permision</th>
                                            <th className="h-10 min-w-25 text-center">View</th>
                                            <th className="h-10 min-w-25 text-center">Create</th>
                                            <th className="h-10 min-w-25 text-center">Edit</th>
                                            <th className="h-10 min-w-25 text-center">Delete</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className={`border-b border-gray-50 font-medium text-[#0F172A] items-center`}>
                                            <td className="px-5 py-3">Dashboard</td>
                                            <td className="px-5 py-3">
                                                <div className="w-full flex items-center justify-center">
                                                    <div className="cursor-pointer size-5 border-2 flex items-center justify-center text-white bg-[#2563EB] border-[#2563EB] rounded-sm">
                                                        <IconCheckFilled size={20} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="w-full flex items-center justify-center">
                                                    <div className="cursor-pointer size-5 border-2 flex items-center justify-center text-white border-[#E2E8F0] rounded-sm">
                                                        <IconCheckFilled size={20} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="w-full flex items-center justify-center">
                                                    <div className="cursor-pointer size-5 border-2 flex items-center justify-center text-white border-[#E2E8F0] rounded-sm">
                                                        <IconCheckFilled size={20} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="w-full flex items-center justify-center">
                                                    <div className="cursor-pointer size-5 border-2 flex items-center justify-center text-white border-[#E2E8F0] rounded-sm">
                                                        <IconCheckFilled size={20} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}