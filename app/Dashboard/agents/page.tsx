import CreateNewAgentUI from "./createNewAgentUI";
import AgentsListUI from "./AgentsListUI";
import { useEffect, useState } from "react";

export default function Agents() {

    const [addAgents, setAddAgents] = useState(false)

    const changeMode = () => {
        setAddAgents(!addAgents)
    }

    const getAgents = async () => {
        const res = await fetch('/api/agents/getAgents')
        const data = await res.json()
        alert(JSON.stringify(data))
    }


    const createAgent = async () => {
        console.log('start')
        const res = await fetch('/api/agents/addAgents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'User1',
                email: 'user1@gmail.com',
                phone: '0123456789',
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
            {!addAgents && (<AgentsListUI addAgent={changeMode} />)}
        </div>
    )
}