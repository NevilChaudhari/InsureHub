import { IconBell, IconChevronDownFilled, IconMenu2Filled, IconUserFilled, IconZoom } from "@tabler/icons-react";

export default function Agents() {
    return (
        <div className="flex flex-col w-full h-full gap-10">

            {/* Navbar */}
            <div className="flex flex-col">
                <div className="flex h-25 items-center place-content-between px-5">

                    {/* Name and Menu */}
                    <div className="flex gap-10">
                        <div className="hover:bg-[#E5E7EB] cursor-pointer rounded-full w-10 h-10 items-center justify-center flex"><IconMenu2Filled /></div>
                        <div className="flex font-semibold text-lg items-center justify-center">
                            Name
                        </div>
                    </div>

                    {/* Searchbox, Notification, Account/UserProfile */}
                    <div className="flex gap-10 items-center">
                        {/* Searchbox */}
                        <div className="flex border rounded-md h-10 items-center justify-center px-3 border-[#94A3B8]">
                            <input type="text" placeholder="Search Agents..." className="focus:outline-0" />
                            <IconZoom stroke={2} size={20} className="cursor-pointer text-[#475569]" />
                        </div>

                        {/* Notification */}
                        <div className="flex items-center justify-center w-10 h-10 hover:bg-[#E5E7EB] rounded-full cursor-pointer text-[#475569]"><IconBell stroke={2} /></div>

                        {/* Account/UserProfile */}
                        <div className="flex gap-2 hover:bg-[#E5E7EB] px-2 py-2 cursor-pointer rounded-md">

                            {/* User Profile */}
                            <div className="rounded-full overflow-hidden w-12 h-12">
                                <img src="/Auth-BG.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>

                            {/* Username and Role */}
                            <div className="flex flex-col justify-center">
                                <div className="flex font-semibold text-sm">Username</div>
                                <div className="flex text-xs">Role</div>
                            </div>

                            {/* More */}
                            <div className=" items-center justify-center flex">
                                <IconChevronDownFilled size={15} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className={`border-t border-[#E5E7EB] w-full`}></div>
            </div>


            {/* Content */}
            <div className="flex flex-1">

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
            </div>
        </div>
    )
}