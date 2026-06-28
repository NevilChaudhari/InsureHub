'use client'
import { useEffect, useState } from "react";
import CreateContractUI from "./CreateContractUI";
import ContractsListUI from "./ContractsListUI";

interface Customer {
    id: string;
    name: string;
}

interface Contract {
    id: number
    policyType: string
    vehicleNumber: string
    vehicleModel: string
    paymentFrequency: number
    endDate: string
    startDate: number
    premiumAmmount: string
    customerId: string
    customers: Customer;
}

export default function Contracts() {

    const [addContract, setAddContract] = useState(false)
    const [totalContracts, setTotalContracts] = useState<number>(0)
    const [totalPremium, setTotalPremium] = useState<number>(0)
    const [agents, setContracts] = useState<Contract[]>([])

    const changeMode = () => {
        setAddContract(!addContract)
    }

    const getAllContracts = async () => {
        const res = await fetch('/api/contract/getAllContracts')
        const data = await res.json()
        setTotalContracts(data.count)
    }

    const getAllPremium = async () => {
        const res = await fetch('/api/contract/getAllPremium')
        const data = await res.json()
        setTotalPremium(data.total)
    }

    const getContracts = async (start: number, end: number) => {
        const res = await fetch('/api/contract/getContracts', {
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
        setContracts(data)
    }


    const createCustomer = async (name: string, email: string, phone: string) => {

        if (!name || !email || !phone || phone.toString().length != 10) {
            return;
        }

        const res = await fetch('/api/contract/createCustomer/', {
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
        const data = await res.json()

        return (data.id)
    }

    const createContract = async (name: string, email: string, phone: string, policType: string, vehicleNumber: string, vehicleModel: string, startDate: string, endDate: string, paymentFrequency: string, premiumAmmount: number) => {

        if (!name || !email || !phone || !policType || !vehicleNumber || !vehicleModel || !startDate || !endDate || !paymentFrequency || !premiumAmmount) {
            return;
        }

        const customerId = await createCustomer(name, email, phone)

        const body = { customerId, policType, vehicleNumber, vehicleModel, startDate, endDate, paymentFrequency, premiumAmmount }

        const res = await fetch('/api/contract/createContract/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        changeMode()
    }

    useEffect(() => {
        getAllContracts()
        getContracts(0, 10);
        getAllPremium();
    }, [])

    useEffect(() => {
        console.log("agents updated", agents);
    }, [agents]);

    return (
        <div className="relative flex flex-col w-full h-full">
            {/* New Agent Page */}
            {addContract && (<CreateContractUI back={changeMode} createContract={createContract} />)}

            {/* Content */}
            {!addContract && (<ContractsListUI addAgent={changeMode} contract={agents} getContracts={() => { getContracts }} totalContracts={totalContracts} totalPremium={totalPremium} />)}
        </div>
    )
}