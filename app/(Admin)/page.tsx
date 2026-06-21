import { useState } from "react";
import Agents from "./Agents/page";
import AdminDashboard from "./Dashboard/page";
import Dealers from "./Dealers/page";
import Customers from "./Customers/page";
import InsuranceProducts from "./InsuranceProducts/page";
import AddOns from "./AddOns/page";
import Claims from "./Claims/page";
import Contracts from "./Contracts/page";
import RateSheets from "./RateSheets/page";
import ReportsAnalitics from "./ReportsAnalytics/page";
import Users from "./Users/page";
import RolesPermissions from "./RolesPermissions/page";
import Settings from "./Settings/page";
import AuditLogs from "./AuditLogs/page";

type pageId = "dashboard" | "agents" | "dealers" | "customers" | "insuranceproducts" | "addons" | "ratesheets" | "contracts" | "claims" | "reports&analytics" | "users" | "roles&permissions" | "settings" | "auditlogs";

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
            case "reports&analytics":
                return <ReportsAnalitics />;
            case "users":
                return <Users />;
            case "roles&permissions":
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
            <div className={`left-0 top-0 h-screen flex flex-col transition-all duration-100 z-40 bg-[#021B3A] border-right border-1px border-black justify-center
                ${collapse ? "w-[3vw] items-center" : "w-[15vw]"}
            `}>
                <div className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-700/60">
                    <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        O
                    </div>
                    {!collapse && (<div>
                        <div className="text-white font-bold text-base leading-tight">
                            InsureHub
                        </div>
                        <div className="text-slate-400 text-[10px] leading-tight">
                            Insurance Management System
                        </div>
                    </div>)}
                </div>

                <div className="flex-1 overflow-x-hidden overflow-y-auto py-4 px-2 space-y-0.5">
                    <div onClick={() => { changeCurrentPage("dashboard"); }} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-blue-600 text-white" >
                        <span className="shrink-0 text-white">D</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Dashboard</span>)}
                    </div>
                    <div className={` ${collapse ? "border-t border-slate-700/50 my-3" : "pt-4 pb-1 px-2"} `}>
                        {!collapse && (<span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Management</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("agents"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300" >
                        <span className="shrink-0 text-slate-400">A</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Agent</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("dealers"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300" >
                        <span className="shrink-0 text-slate-400">D</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Dealers</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("customers"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300" >
                        <span className="shrink-0 text-slate-400">C</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Customers</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("insuranceproducts"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300" >
                        <span className="shrink-0 text-slate-400">I</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Insurance Products</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("addons"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300" >
                        <span className="shrink-0 text-slate-400">A</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Add-ons</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("ratesheets"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300" >
                        <span className="shrink-0 text-slate-400">R</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Rate Sheets</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("contracts"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300">
                        <span className="shrink-0 text-slate-400">C</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Contracts</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("claims"); }} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-slate-700/50 hover:text-white text-slate-300" >
                        <span className="shrink-0 text-slate-400">C</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Claims</span>)}
                    </div>
                    <div className={` ${collapse ? "border-t border-slate-700/50 my-3" : "pt-4 pb-1 px-2"} `}>
                        {!collapse && (<span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest"> Reports </span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("reports&analytics"); }} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white">
                        <span className="shrink-0 text-slate-400">R</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Reports & Analysics</span>)}
                    </div>
                    <div className={` ${collapse ? "border-t border-slate-700/50 my-3" : "pt-4 pb-1 px-2"} `}>
                        {!collapse && (<span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest"> System </span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("users"); }} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white">
                        <span className="shrink-0 text-slate-400">U</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Users</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("roles&permissions"); }} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white">
                        <span className="shrink-0 text-slate-400">R</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Roles & Permissions</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("settings"); }} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white">
                        <span className="shrink-0 text-slate-400">S</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Settings</span>)}
                    </div>
                    <div onClick={() => { changeCurrentPage("auditlogs"); }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white">
                        <span className="shrink-0 text-slate-400">A</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Audit Logs</span>)}
                    </div>
                </div>

                {/* Colapse Button */}
                <div className="border-t border-slate-700/60 p-3">
                    <div onClick={() => { setCollapse(!collapse); }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white">
                        <span className="shrink-0 text-slate-400">{'<'}</span>
                        {!collapse && (<span className="flex-1 min-w-0 text-left truncate">Colapse Menu</span>)}
                    </div>
                </div>
            </div>
            <div className={`w-full top-0 border border-white transition-all duration-100 
                `}>{returnCurrentPage()}</div>
        </div>
    );
}
