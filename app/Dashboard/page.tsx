'use client'

import { Users, Settings } from "lucide-react";
import { useState } from "react";
import AddOns from "./addons/page";
import Agents from "./agents/page";
import AuditLogs from "./auditLogs/page";
import Claims from "./claims/page";
import Contracts from "./contracts/page";
import Customers from "./customers/page";
import AdminDashboard from "./dashboard/page";
import Dealers from "./dealers/page";
import InsuranceProducts from "./insuranceProducts/page";
import RateSheets from "./rateSheets/page";
import ReportsAnalitics from "./reportsAnalytics/page";
import RolesPermissions from "./roles/page";
import NavbarUI from "../components/Navbar";
import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled } from "@tabler/icons-react";


type pageId = "dashboard" | "agents" | "dealers" | "customers" | "insuranceproducts" | "addons" | "ratesheets" | "contracts" | "claims" | "reports" | "users" | "roles" | "settings" | "auditlogs";

export default function MainLayout() {
    const [currentPage, setCurrentPage] = useState<pageId>("dashboard");
    const [collapse, setCollapse] = useState(false);

    const changeCurrentPage = (page: pageId) => {
        setCurrentPage(page);
    };

    const returnCurrentPage = () => {
        switch (currentPage) {
            case "dashboard":
                return <AdminDashboard />;
            case "agents":
                return <Agents />;
            case "dealers":
                return <Dealers />;
            case "customers":
                return <Customers />;
            case "insuranceproducts":
                return <InsuranceProducts />;
            case "addons":
                return <AddOns />
            case "ratesheets":
                return <RateSheets />
            case "contracts":
                return <Contracts />
            case "claims":
                return <Claims />;
            case "reports":
                return <ReportsAnalitics />;
            case "users":
                return <Users />;
            case "roles":
                return <RolesPermissions />;
            case "settings":
                return <Settings />;
            case "auditlogs":
                return <AuditLogs />;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className="flex">
            <div className={`left-0 top-0 h-screen flex flex-col transition-all duration-100 z-40 bg-[#021B3A] border-right border-1px border-black justify-center ${collapse ? "w-[3vw] items-center" : "w-[15vw]"} px-2`}>
                <div className="flex items-center gap-2.5 py-4">
                    <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">O</div>
                    {!collapse && (<div>
                        <div className="text-white font-bold text-base leading-tight"> InsureHub </div>
                        <div className="text-slate-400 text-[10px] leading-tight"> Insurance Management System </div>
                    </div>)}
                </div>
                <div className={`border-t border-slate-700/50 w-full`}></div>

                <div className="flex-1 overflow-x-hidden overflow-y-auto py-4 space-y-0.5 text-white">
                    <div onClick={() => { changeCurrentPage("dashboard"); }} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${currentPage === 'dashboard' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} text-white`} >
                        <span>D</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Dashboard</span>)}
                    </div>

                    {!collapse && (<div className="flex text-xs text-[#CBD5E1]/50 font-semibold pt-5 px-2">MANAGEMENT</div>)}
                    {collapse && (<div className={`border-t border-slate-700/50 w-full`}></div>)}

                    <div onClick={() => { changeCurrentPage("agents"); }} className={`${currentPage === 'agents' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>A</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Agent</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("customers"); }} className={`${currentPage === 'customers' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>C</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Customers</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("insuranceproducts"); }} className={`${currentPage === 'insuranceproducts' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>I</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Insurance Products</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("addons"); }} className={`${currentPage === 'addons' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>A</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Addons</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("ratesheets"); }} className={`${currentPage === 'ratesheets' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>R</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Rate Sheets</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("contracts"); }} className={`${currentPage === 'contracts' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>C</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Contracts</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("claims"); }} className={`${currentPage === 'claims' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>C</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Claims</span>)}
                    </div>

                    {!collapse && (<div className="flex text-xs text-[#CBD5E1]/50 font-semibold pt-5 px-2">REPORTS</div>)}
                    {collapse && (<div className={`border-t border-slate-700/50 w-full`}></div>)}

                    <div onClick={() => { changeCurrentPage("reports"); }} className={`${currentPage === 'reports' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>R</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Reports & Analytics</span>)}
                    </div>

                    {!collapse && (<div className="flex text-xs text-[#CBD5E1]/50 font-semibold pt-5 px-2">SYSTEMS</div>)}
                    {collapse && (<div className={`border-t border-slate-700/50 w-full`}></div>)}

                    <div onClick={() => { changeCurrentPage("users"); }} className={`${currentPage === 'users' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>U</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Users</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("roles"); }} className={`${currentPage === 'roles' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>R</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Roles & Permissions</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("settings"); }} className={`${currentPage === 'settings' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>S</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Settings</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("auditlogs"); }} className={`${currentPage === 'auditlogs' ? 'bg-[#2563EB] hover:bg-[#3B82F6]' : 'hover:bg-slate-700/50'} flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-white`} >
                        <span>A</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Audit Logs</span>)}
                    </div>
                </div>

                {/* Colapse Button */}
                <div className={`border-t border-slate-700/50 w-full`}></div>
                <div className="p-3">
                    <div onClick={() => { setCollapse(!collapse); }} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white">
                        {!collapse && (<span className="shrink-0 text-slate-400"><IconLayoutSidebarLeftCollapseFilled /></span>)}
                        {collapse && (<span className="shrink-0 text-slate-400"><IconLayoutSidebarLeftExpandFilled /></span>)}
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Colapse Menu</span>)}
                    </div>
                </div>
            </div>
            <div className='px-5 bg-[#F8FAFC] w-full h-screen transition-all duration-100 text-black gap-10 flex flex-col overflow-auto'>
                <NavbarUI name={currentPage.toUpperCase()} placeholderText={currentPage} showSearchBar={false} colapseSidebar={() => { setCollapse(!collapse) }} />
                {returnCurrentPage()}
            </div>
        </div>
    );
}
