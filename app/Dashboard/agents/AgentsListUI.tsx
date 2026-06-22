import { IconUserFilled, IconPlusFilled, IconDotsFilled } from "@tabler/icons-react"
import { format } from "date-fns";

interface Agent {
    id: number
    name: string
    code: string
    email: string
    phone: number
    status: string
    dealers: number
    joinedOn: string
}

type Props = {
    addAgent: () => void
    agents: Agent[]
}

export default function AgentsListUI({ addAgent, agents }: Props) {
    return (
        <div className="flex flex-col flex-1 gap-10">

            {/* Cards */}
            <div className="flex gap-10">
                {/* Card 1 */}
                <div className="flex border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Total Agents</label>
                        <label className="text-[#0F172A] font-bold text-2xl">999</label>
                    </div>

                    <div className="rounded-xl bg-[#DBEAFE] w-13 h-13 flex items-center justify-center text-[#2563EB]"><IconUserFilled size={30} /></div>
                </div>
                {/* Card 2 */}
                <div className="flex border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Active Agents</label>
                        <label className="text-[#0F172A] font-bold text-2xl">999</label>
                    </div>

                    <div className="rounded-xl bg-[#DCFCE7] w-13 h-13 flex items-center justify-center text-[#16A34A]"><IconUserFilled size={30} /></div>
                </div>
                {/* Card 3 */}
                <div className="flex border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Inactive Agents</label>
                        <label className="text-[#0F172A] font-bold text-2xl">999</label>
                    </div>

                    <div className="rounded-xl bg-[#FEE2E2] w-13 h-13 flex items-center justify-center text-[#DC2626]"><IconUserFilled size={30} /></div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

                {/* Add Agent */}
                <div className="flex items-center justify-end p-4 border-b border-gray-100">
                    <div onClick={() => { addAgent() }} className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <IconPlusFilled />
                        Add Agent
                    </div>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="h-10 text-start px-5">Agent Name</th>
                                <th className="h-10 text-start px-5">Agent Code</th>
                                <th className="h-10 text-start px-5">Email</th>
                                <th className="h-10 text-start px-5">Phone</th>
                                <th className="h-10 text-start px-5">Status</th>
                                <th className="h-10 text-start px-5">Dealers</th>
                                <th className="h-10 text-start px-5">Joined On</th>
                                <th className="h-10 text-start px-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map((agent) => {
                                return (
                                    <tr key={agent.id} className="border-b border-gray-50 font-medium text-gray-800 hover:bg-gray-50/50 transition-colors items-center">
                                        <td className="px-5 py-3">{agent.name}</td>
                                        <td className="px-5 py-3">{agent.code}</td>
                                        <td className="px-5 py-3">{agent.email}</td>
                                        <td className="px-5 py-3">{agent.phone}</td>
                                        <td className="px-5 py-3">
                                            {agent.status === 'Inactive'
                                                ? (<div className="flex w-17 h-7 items-center justify-center rounded-md bg-[#FEE2E2] text-[#DC2626]">
                                                    {agent.status}
                                                </div>)
                                                : (<div className="flex w-17 h-7 items-center justify-center rounded-md bg-[#DCFCE7] text-[#16A34A]">
                                                    {agent.status}
                                                </div>)
                                            }
                                        </td>
                                        <td className="px-5 py-3">{agent.dealers}</td>
                                        <td className="px-5 py-3">{format(new Date(agent.joinedOn), "MMM d, yyyy")}</td>
                                        <td className="px-5 py-3">
                                            <div className="cursor-pointer hover:bg-[#F1F5F9] w-10 h-8 border border-[#CBD5E1] rounded-md flex items-center justify-center"><IconDotsFilled /></div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex place-content-between">
                    <div className="px-5 py-3 text-sm flex items-center justify-center">
                        {agents.length > 10 ? `Showing 1 to 10 out of ${agents.length}` : `Showing ${agents.length} out of ${agents.length}`}
                    </div>

                    <div className="px-5 py-3 text-sm flex gap-2">
                        <div className="cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md w-10 h-10 bg-[#3B82F6] text-white font-semibold">1</div>
                        <div className="cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md w-10 h-10 bg-transparent text-black font-semibold">2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}