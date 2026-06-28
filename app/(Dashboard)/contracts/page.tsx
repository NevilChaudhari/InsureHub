'use client'
import { useEffect, useState } from "react";
import CreateContractUI from "./CreateContractUI";
import ContractsListUI from "./ContractsListUI";
import ContractDetailsUI from "./ContractDetailsUI";

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface Contract {
    id: string
    policyType: string
    vehicleNumber: string
    vehicleModel: string
    paymentFrequency: number
    endDate: string
    startDate: string
    premiumAmmount: string
    customerId: string
    customers: Customer;
}

type active = 'List' | 'Create' | 'Details';

export default function Contracts() {

    const defaultCustomer = {
        id: 'loading...',
        name: 'loading...',
        email: 'loading...',
        phone: 'loading...',
    }

    const defaultData = {
        id: 'loading...',
        policyType: 'loading...',
        vehicleNumber: 'loading...',
        vehicleModel: 'loading...',
        paymentFrequency: 0,
        endDate: new Date().toISOString(),
        startDate: new Date().toISOString(),
        premiumAmmount: 'loading...',
        customerId: 'loading...',
        customers: defaultCustomer
    }

    const [active, setActive] = useState<active>('List')
    const [totalContracts, setTotalContracts] = useState<number>(0)
    const [totalPremium, setTotalPremium] = useState<number>(0)
    const [contracts, setContracts] = useState<Contract[]>([])
    const [contract, setContract] = useState<Contract>(defaultData)
    const [activeContract, setActiveContract] = useState<string>('')

    const changeModetoList = () => {
        setActive('List')
    }
    const changeModetoCreate = () => {
        setActive('Create')
    }
    const changeModetoDetails = (id: string) => {
        setActiveContract(id)
        getSpecificContract(id)
        setActive('Details')
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

    const getSpecificContract = async (id: string) => {
        const res = await fetch('/api/contract/getSpecificContract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        })
        const data = await res.json()
        setContract(data)
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

        changeModetoList()
    }

    useEffect(() => {
        getAllContracts()
        getContracts(0, 10);
        getAllPremium();
    }, [])

    useEffect(() => {
        console.log("agents updated", contracts);
    }, [contracts]);

    useEffect(() => {
        console.log("contract updated", contract);
    }, [contract]);

    return (
        <div className="relative flex flex-col w-full h-full">
            {/* Create */}
            {active === 'Create' && (<CreateContractUI back={changeModetoList} createContract={createContract} />)}

            {/* Create */}
            {active === 'List' && (<ContractsListUI addAgent={changeModetoCreate} contract={contracts} getContracts={() => { getContracts }} totalContracts={totalContracts} totalPremium={totalPremium} changeModetoDetails={changeModetoDetails} />)}

            {/* Details */}
            {active === 'Details' && (<ContractDetailsUI changeModetoList={changeModetoList} contract={contract ?? defaultData} />)}
        </div>
    )
}