'use client'

import CreateNewAgentUI from "./createNewAgentUI";
import AgentsListUI from "./AgentsListUI";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface User {
    id: string
    name: string
    created_at: string
    role: string
    email: string
}

interface Agent {
    id: number
    phone: number
    dealers: number
    code: string
    status: string
    userId: User
}

export default function Agents() {
    const supabase = createClient();

    const [addAgents, setAddAgents] = useState(false)
    const [totalAgents, setTotalAgents] = useState<number>(0)
    const [totalActiveAgents, setTotalActiveAgents] = useState<number>(0)
    const [totalInactiveAgents, setTotalInactiveAgents] = useState<number>(0)
    const [agents, setAgents] = useState<Agent[]>([])

    const changeMode = () => {
        setAddAgents(!addAgents)
    }

    const getAllAgents = async () => {
        const res = await fetch('/api/agents/getAllAgents')
        const data = await res.json()
        setTotalAgents(data.count)
    }

    const getAllActiveAgents = async () => {
        const res = await fetch('/api/agents/getAllActiveAgents')
        const data = await res.json()
        setTotalActiveAgents(data.count)
    }

    const getAllInactiveAgents = async () => {
        const res = await fetch('/api/agents/getAllInactiveAgents')
        const data = await res.json()
        setTotalInactiveAgents(data.count)
    }

    const getAgents = async (start: number, end: number) => {
        const res = await fetch('/api/agents/getAgents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start: start,
                end: end
            })
        })
        const data = await res.json()
        setAgents(data)
    }


    const createAgent = async (name: string, email: string, phone: number, password: string) => {

        if (!name || !email || !password || !phone || phone.toString().length != 10) {
            alert('fill the fields')
            return;
        }

        const userData = await fetch('/api/auth/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
        })

        const uData = await userData.json();

        if (!userData.ok) {
            alert(uData.error?.message || "Failed to create user");
            return;
        }

        if (uData.error) {
            alert(`Agent Auth Error: ${uData.error.message}`);
            return;
        }

        if (!uData?.user?.id) {
            console.log("Agent ID not received");
            return;
        }

        // alert(JSON.stringify(uData))

        try {
            const res = await fetch('/api/agents/addAgents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    role: 'agent',
                    id: uData.user.id
                }),
            })

            const data = await res.json()

            console.log("Status:", res.status);
            console.log("Response:", data);

            if (data.error) {
                alert(`Agent Error: ${data.error.message}`)
                return;
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }

        getAgents(0, 10);
        changeMode()
    }

    useEffect(() => {
        getAllAgents()
        getAllActiveAgents()
        getAllInactiveAgents()
        getAgents(0, 10);
    }, [])

    useEffect(() => {
        console.log("agents updated", agents);
    }, [agents]);

    return (
        <div className="relative flex flex-col w-full h-full">
            {/* New Agent Page */}
            {addAgents && (<CreateNewAgentUI back={changeMode} createAgent={createAgent} />)}

            {/* Content */}
            {!addAgents && (<AgentsListUI addAgent={changeMode} agents={agents} getAgents={getAgents} totalAgents={totalAgents} totalActiveAgents={totalActiveAgents} totalInactiveAgents={totalInactiveAgents} />)}
        </div>
    )
}