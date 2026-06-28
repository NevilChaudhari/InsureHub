import { createClient } from "@/lib/supabase";
import { IconBell, IconChevronDownFilled, IconMenu2Filled, IconUserFilled, IconZoom } from "@tabler/icons-react";
import { useState, useEffect } from "react";

type params = {
    showSearchBar: boolean,
    name: string
    placeholderText: string
    colapseSidebar: () => void
}
export default function NavbarUI({ showSearchBar, name, placeholderText, colapseSidebar }: params) {

    const [user, setUser] = useState<any>()

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex h-20 items-center place-content-between px-5">

                {/* Name and Menu */}
                <div className="flex gap-5">
                    <div onClick={colapseSidebar} className="hover:bg-[#E5E7EB] cursor-pointer rounded-full w-10 h-10 items-center justify-center flex"><IconMenu2Filled /></div>
                    <div className="flex font-semibold text-2xl items-center justify-center">
                        {name}
                    </div>
                </div>

                {/* Searchbox, Notification, Account/UserProfile */}
                <div className="flex gap-10 items-center">
                    {/* Searchbox */}
                    {showSearchBar && (<div className="flex border rounded-md h-10 items-center justify-center px-3 border-[#94A3B8]">
                        <input type="text" placeholder={placeholderText} className="focus:outline-0" />
                        <IconZoom stroke={2} size={20} className="cursor-pointer text-[#475569]" />
                    </div>)}

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
                            <div className="flex font-semibold text-sm">{user ? user.email : ''}</div>
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
    )
}