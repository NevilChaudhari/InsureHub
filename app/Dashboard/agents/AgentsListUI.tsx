import { IconUserFilled, IconPlusFilled, IconDotsFilled, IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

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
    totalAgents: number
    totalActiveAgents: number
    totalInactiveAgents: number
    getAgents: (start: number, end: number) => void
}

export default function AgentsListUI({ addAgent, agents, totalAgents, totalActiveAgents, totalInactiveAgents, getAgents }: Props) {

    const [pages, setPages] = useState(0)
    const [activePage, setActivePage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const calculatePages = () => {
            setPages(Math.ceil(totalAgents / 10))
        }

        calculatePages()
    }, [totalAgents])

    useEffect(() => {
        setLoading(true)
        getAgents(activePage * 10 + 1, activePage * 10 + 10)
    }, [activePage])

    useEffect(() => {
        setLoading(false)
        console.log("agents updated in UI", agents);
    }, [agents]);

    return (
        <div className="flex flex-col flex-1 gap-10 pb-10">

            {/* Cards */}
            <div className="flex gap-10">
                {/* Card 1 */}
                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Total Agents</label>
                        <label className="text-[#0F172A] font-bold text-2xl">{totalAgents}</label>
                    </div>

                    <div className="rounded-xl bg-[#DBEAFE] w-13 h-13 flex items-center justify-center text-[#2563EB]"><IconUserFilled size={30} /></div>
                </div>
                {/* Card 2 */}
                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Active Agents</label>
                        <label className="text-[#0F172A] font-bold text-2xl">{totalActiveAgents}</label>
                    </div>

                    <div className="rounded-xl bg-[#DCFCE7] w-13 h-13 flex items-center justify-center text-[#16A34A]"><IconUserFilled size={30} /></div>
                </div>
                {/* Card 3 */}
                <div className="flex bg-white border border-[#E2E8F0] rounded-lg w-70 h-25 items-center p-3 place-content-between">
                    <div className="flex flex-col place-content-evenly h-full">
                        <label className="text-[#0F172A] font-semibold text-sm">Inactive Agents</label>
                        <label className="text-[#0F172A] font-bold text-2xl">{totalInactiveAgents}</label>
                    </div>

                    <div className="rounded-xl bg-[#FEE2E2] w-13 h-13 flex items-center justify-center text-[#DC2626]"><IconUserFilled size={30} /></div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

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

                        {loading
                            ? (
                                <tbody>
                                    {[...Array(5)].map((_, index) => (
                                        <tr key={index} className="border-b border-gray-50">
                                            <td className="px-5 py-3">
                                                <Skeleton width={140} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={90} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={200} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={120} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton
                                                    width={70}
                                                    height={28}
                                                    borderRadius={6}
                                                />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={40} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton width={110} />
                                            </td>

                                            <td className="px-5 py-3">
                                                <Skeleton
                                                    width={40}
                                                    height={32}
                                                    borderRadius={6}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                            : (
                                <tbody>
                                    {agents
                                        .map((agent) => {
                                            return (
                                                <tr key={agent.id} className="border-b border-gray-50 font-medium text-gray-800 hover:bg-gray-50/50 bg-green transition-colors items-center">
                                                    <td className="px-5 py-3">{agent.name}</td>
                                                    <td className="px-5 py-3">{agent.code}</td>
                                                    <td className="px-5 py-3">{agent.email}</td>
                                                    <td className="px-5 py-3">{agent.phone}</td>
                                                    <td className="px-5 py-3">
                                                        {agent.status === 'inactive'
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
                            )
                        }
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex place-content-between">
                    <div className="px-5 py-3 text-sm flex items-center min-w-100">
                        {totalAgents > 10 ? `Showing ${activePage * 10 + 1} to ${totalAgents < (activePage * 10 + 10) ? (totalAgents) : (activePage * 10 + 10)} out of ${totalAgents}` : `Showing ${totalAgents} out of ${totalAgents}`}
                    </div>

                    {/* Pages UI */}
                    <div className="px-5 py-3 text-sm flex gap-2">
                        {activePage > 0 && (<div onClick={() => { setActivePage(activePage - 1) }}
                            className={`bg-transparent text-black cursor-pointer hover:bg-[#F1F5F9] hover:text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                            <IconCaretLeftFilled />
                        </div>)}

                        <div className="flex overflow-x-hidden max-w-200 gap-1">
                            {pages <= 3
                                ? (Array.from({ length: pages }, (_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActivePage(i)}
                                        className={`${activePage === (i) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                    >
                                        {i + 1}
                                    </div>
                                )))
                                : <div className="flex gap-1">
                                    {activePage >= 3 && (
                                        <div onClick={() => { setActivePage(0) }}
                                            className={`px-2 ${activePage === (0) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                            1
                                        </div>
                                    )}
                                    {activePage < 3 && (Array.from({ length: 3 }, (_, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActivePage(i)}
                                            className={`px-2 ${activePage === (i) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                        >
                                            {i + 1}
                                        </div>
                                    )))}

                                    <div className={`bg-transparent text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                                        <IconDotsFilled />
                                    </div>

                                    {(activePage! >= 3 && activePage! <= (pages - 4)) && (
                                        <div className="flex gap-1">
                                            <div onClick={() => { setActivePage(activePage - 1) }} className={`px-2 ${activePage === (activePage - 1) ? 'px-2 bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                                {activePage}
                                            </div>
                                            <div className={`px-2 bg-[#2563EB] text-white cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                                {activePage + 1}
                                            </div>
                                            <div onClick={() => { setActivePage(activePage + 1) }} className={`px-2 ${activePage === (activePage + 1) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                                {activePage + 2}
                                            </div>
                                        </div>
                                    )}

                                    {(activePage! >= 3 && activePage! <= (pages - 4)) && (<div className={`bg-transparent text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                                        <IconDotsFilled />
                                    </div>)}

                                    {activePage > (pages - 4) && (Array.from({ length: 3 }, (_, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActivePage((pages - 3) + i)}
                                            className={`px-2 ${activePage === ((pages - 3) + i) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}
                                        >
                                            {(pages - 2) + i}
                                        </div>
                                    )))}
                                    {activePage <= (pages - 4) && (
                                        <div onClick={() => { setActivePage(pages - 1) }}
                                            className={`px-2 ${activePage === (pages - 1) ? 'bg-[#2563EB] text-white' : 'bg-transparent text-black'} cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md min-w-10 min-h-10 font-semibold`}>
                                            {pages}
                                        </div>
                                    )}

                                </div>
                            }
                        </div>
                        {activePage < (pages - 1) && (<div onClick={() => { setActivePage(activePage + 1) }}
                            className={`bg-transparent text-black cursor-pointer hover:bg-[#F1F5F9] hover:text-black flex items-center justify-center rounded-md min-w-10 min-h-10 font-semibold`}>
                            <IconCaretRightFilled />
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}