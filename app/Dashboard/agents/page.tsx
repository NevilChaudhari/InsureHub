import NavbarUI from "@/app/components/Navbar";
import { IconDotsFilled, IconPlusFilled, IconUserFilled } from "@tabler/icons-react";

export default function Agents() {
    return (
        <div className="flex flex-col w-full h-full gap-10">

            {/* Navbar */}
            <NavbarUI showSearchBar={true} name={"Agents"} placeholderText="Search Agents..." />

            {/* Content */}
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
                    <div className="flex items-center justify-end p-4 border-b border-gray-100">
                        <button className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            <IconPlusFilled />
                            Add Agent
                        </button>
                    </div>

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
                                <tr className="border-b border-gray-50 font-medium text-gray-800 hover:bg-gray-50/50 transition-colors items-center">
                                    <td className="px-5 py-3">Agent Name</td>
                                    <td className="px-5 py-3">AGT-001</td>
                                    <td className="px-5 py-3">agentemail@gmail.com</td>
                                    <td className="px-5 py-3">1234567890</td>
                                    <td className="px-5 py-3">Active</td>
                                    <td className="px-5 py-3">99</td>
                                    <td className="px-5 py-3">Jan 10, 2024</td>
                                    <td className="px-5 py-3">
                                        <div className="cursor-pointer hover:bg-[#F1F5F9] w-10 h-8 border border-[#CBD5E1] rounded-md flex items-center justify-center"><IconDotsFilled /></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex place-content-between">
                        <div className="px-5 py-3 text-sm flex items-center justify-center">
                            Showing 1 to 10 out of 999
                        </div>

                        <div className="px-5 py-3 text-sm flex gap-2">
                            <div className="cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md w-10 h-10 bg-[#3B82F6] text-white font-semibold">1</div>
                            <div className="cursor-pointer hover:bg-[#DBEAFE] hover:text-black flex items-center justify-center border border-[#CBD5E1] rounded-md w-10 h-10 bg-transparent text-black font-semibold">2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}