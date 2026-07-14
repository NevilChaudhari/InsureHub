'use client'

import { useEffect, useState } from "react"
import { IconBrandGoogleFilled, IconEye, IconEyeFilled, IconLock, IconMail, IconUser } from '@tabler/icons-react';
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Users() {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const supabase = createClient();
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, } = await supabase.auth.getUser()

            if (user) {
                router.push('/')
            }
        }

        getUser()
    }, [])

    const signIn = async () => {
        if (!email || !password) {
            setError('Please fill the Credentials')
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message);
            console.error(error)
        }
        router.push('/')
    }

    return (
        <div className="flex bg-[#F8FAFC] w-full min-h-screen text-[#0F172A]">
            {/* Left Area */}
            <div className="flex flex-1 bg-red-200">
                <div className="flex w-full h-full">
                    <img src="/Auth-BG.png" alt="Auth-Background" className="w-full h-full object-cover" />
                </div>
            </div>
            {/* Right Area */}
            <div className="flex-col flex justify-center w-[35%] min-h-full border border-green-500">
                <div className="flex flex-col p-10 gap-20">

                    <div className="flex flex-col gap-10 px-10">

                        {/* Header */}
                        <div className="flex flex-col items-start justify-center">
                            <label className="text-4xl font-semibold">Welcome back</label>
                            <label className="text-md text-[#94A3B8]">Login to continue to InsureHub</label>
                        </div>

                        {/* Placeholders */}
                        <div className="flex flex-col gap-8">

                            {/* Email */}
                            <div>
                                <label className="text-md text-[#021B3A]">Email</label>
                                <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                    <IconMail stroke={2} className="text-[#94A3B8]" size={28} />
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" name="Email" id="email" placeholder="Enter your email" className="w-full h-full focus:outline-none focus:ring-0" />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-md text-[#021B3A]">Password</label>
                                <div className="flex items-center justify-center border border-[#94A3B8] rounded-sm h-12 px-2 gap-2">
                                    <IconLock stroke={2} className="text-[#94A3B8]" size={28} />
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type={showPassword ? 'text' : 'password'} name="Email" id="email" placeholder="Enter your password" className="w-full h-full focus:outline-none focus:ring-0" />
                                    <div className="cursor-pointer" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? (<IconEyeFilled className="text-[#94A3B8]" size={28} />) : (<IconEye stroke={2} className="text-[#94A3B8]" size={28} />)}</div>
                                </div>
                            </div>

                            {/* Error */}
                            {error !== '' && (<div className="flex items-center justify-center text-red-500">
                                <label>*{error}</label>
                            </div>)}
                        </div>

                        {/* Login Button */}
                        <div onClick={signIn} className="flex items-center justify-center bg-[#2563EB] hover:bg-[#3B82F6] cursor-pointer text-[#FFFFFF] h-15 rounded-lg">
                            LogIn
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}