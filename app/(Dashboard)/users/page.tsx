'use client'
import { useEffect, useState } from "react";
import UsersListUI from "./UsersListUI";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export default function Users (){

    const [users, setUsers] = useState<User[]>([])
    const [totalUsers, setTotalUsers] = useState<number>(0)

    const getUsers = async()=>{
        const res = await fetch('api/auth/getAllUsers',{
            method: 'POST',
            body: JSON.stringify({
                start: 1,
                end: 10
            })
        })
        const data = await res.json()

        if(data.error){
            console.log(`get all users error: ${data.error}`)
            return;
        }

        setUsers(data)
    }

    const getTotalUsers = async()=>{
        const res = await fetch('api/auth/getTotalUsers')
        const data = await res.json()

        if(data.error){
            console.log(`get total users error: ${data.error}`)
            return;
        }

        setTotalUsers(data.count)
    }

    useEffect(()=>{
        getUsers();
        getTotalUsers();
    },[])

    return <div className="">
        <UsersListUI getCustomers={getUsers} totalUserss={totalUsers} users={users}/>
    </div>
}