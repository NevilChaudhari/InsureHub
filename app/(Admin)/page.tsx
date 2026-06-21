import { useState } from "react";
import Agents from "./Agents/page";
import AdminDashboard from "./Dashboard/page";

type pageId = 'dashboard' | 'agents';

export default function MainLayout() {
    const [currentPage, setCurrentPage] = useState<pageId>('dashboard')

    const changeCurrentPage = (page: pageId) => {
        setCurrentPage(page);
    }

    const returnCurrentPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <AdminDashboard />
            case 'agents':
                return <Agents />
            default:
                return <AdminDashboard />
        }
    }

    return (
        <div className="flex w-full min-h-screen bg-[#F8FAFC] text-black">
            <div className="flex flex-col gap-2 min-w-[20vw] bg-[#021B3A] border-r border-[#12305D] text-white">
                <div className="">Sidebar</div>
                <div onClick={() => { changeCurrentPage('dashboard') }} className="border">Dashboard</div>
                <div onClick={() => { changeCurrentPage('agents') }} className="border">Agents</div>
            </div>
            <div className="px-5 w-full">{returnCurrentPage()}</div>
        </div>
    )
}