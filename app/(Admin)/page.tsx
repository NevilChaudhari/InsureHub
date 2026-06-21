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
        <div className="flex gap-20">
            <div className="flex flex-col gap-2">
                <div className="">Navbar</div>
                <div onClick={() => { changeCurrentPage('dashboard') }} className="border border-white">Dashboard</div>
                <div onClick={() => { changeCurrentPage('agents') }} className="border border-white">Agents</div>
            </div>
            <div className="border border-white">{returnCurrentPage()}</div>
        </div>
    )
}