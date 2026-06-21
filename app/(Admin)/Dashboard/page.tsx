'use client'

import { createClient } from "@/lib/supabase";
import type { User } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {

    const supabase = createClient();
    const router = useRouter()

    const [user, setUser] = useState<User | any>(null);

    const signOut = async () => {

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error(error)
        }

        router.push('/auth')
    }

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, } = await supabase.auth.getUser()
            setUser(user)
        }

        getUser()
    }, [])

    return (
        <div className="flex flex-col">
            <div>
                Dashboard
            </div>

            <div>{user?.email}</div>
            <div>{user?.user_metadata.display_name}</div>

            <div onClick={signOut} className="border border-white cursor-pointer">
                SignOut
            </div>
        </div>
    );
}