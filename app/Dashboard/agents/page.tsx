'use client'

import CreateNewAgentUI from "./createNewAgentUI";
import AgentsListUI from "./AgentsListUI";
import { useEffect, useState } from "react";

interface Agent {
    id: number
    name: string
    code: string
    email: string
    phone: number
    status: string
    dealers: number
    joinedOn: string
}

export default function Agents() {

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


    const createAgent = async (name: string, email: string, phone: number) => {

        if (!name || !email || !phone || phone.toString().length != 10) {
            return;
        }

        const res = await fetch('/api/agents/addAgents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
            }),
        })
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