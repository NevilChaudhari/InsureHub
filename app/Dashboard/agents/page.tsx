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
    const [agents, setAgents] = useState<Agent[]>([])

    const changeMode = () => {
        setAddAgents(!addAgents)
    }

    const getAgents = async () => {
        const res = await fetch('/api/agents/getAgents')
        const data = await res.json()
        setAgents(data)
    }


    const createAgent = async (name: string, email: string, phone: number) => {

        if (!name || !email || !phone) {
            return;
        }

        console.log('start')
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
        changeMode()
        getAgents()
        console.log('end')
    }

    useEffect(() => {
        getAgents();
    }, [])

    return (
        <div className="relative flex flex-col w-full h-full">
            {/* New Agent Page */}
            {addAgents && (<CreateNewAgentUI back={changeMode} createAgent={createAgent} />)}

            {/* Content */}
            {!addAgents && (<AgentsListUI addAgent={changeMode} agents={agents} />)}
        </div>
    )
}