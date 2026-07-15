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
    address: string;
}

interface Ratesheet {
    id: string;
    dealer: number;
    agent: number;
    claimReserve: number;
    gst: number;
    processingFee: number;
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
    ratesheet: Ratesheet;
}

type active = 'List' | 'Create' | 'Details';

export default function Contracts() {

    const defaultCustomer = {
        id: 'loading...',
        name: 'loading...',
        email: 'loading...',
        phone: 'loading...',
        address: 'loading...',
    }

    const defaultRatesheet = {
        id: 'loading...',
        dealer: 0,
        agent: 0,
        claimReserve: 0,
        gst: 0,
        processingFee: 0,
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
        customers: defaultCustomer,
        ratesheet: defaultRatesheet
    }

    const [active, setActive] = useState<active>('List')
    const [totalContracts, setTotalContracts] = useState<number>(0)
    const [totalPremium, setTotalPremium] = useState<number>(0)
    const [contracts, setContracts] = useState<Contract[]>([])
    const [contract, setContract] = useState<Contract>(defaultData)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [activeContract, setActiveContract] = useState<string>('')

    const changeModetoList = () => {
        setActive('List')
    }
    const changeModetoCreate = () => {
        setActive('Create')
    }
    const changeModetoDetails = async (id: string) => {
        setActiveContract(id)
        getSpecificContract(id)
        setActive('Details')
    }

    const getAllContracts = async () => {
        const res = await fetch('/api/contract/getAllContracts')
        const data = await res.json()
        setTotalContracts(data.count)
    }

    const getCustomers = async (text: string) => {
        const res = await fetch('/api/customers/getAllCustomers', {
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        })
        const data = await res.json()
        setCustomers(data)
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

    const createContract = async (isNewCustomer: boolean, customerId:string, name: string, email: string, phone: string, address: string, policType: string, vehicleNumber: string, vehicleModel: string, startDate: string, endDate: string, paymentFrequency: string, premiumAmmount: number) => {

        if (isNewCustomer) {
            if (!name || !email || !phone || !policType || !vehicleNumber || !vehicleModel || !startDate || !endDate || !paymentFrequency || !premiumAmmount) {
                alert('what')
                return;
            }
        } else {
            if (!customerId || !policType || !vehicleNumber || !vehicleModel || !startDate || !endDate || !paymentFrequency || !premiumAmmount) {
                alert('what')
                return;
            }
        }

        const body = { isNewCustomer, customerId, name, email, phone, address, policType, vehicleNumber, vehicleModel, startDate, endDate, paymentFrequency, premiumAmmount }

        const res = await fetch('/api/contract/createContract/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data = await res.json()

        if(data.error){
            console.log(`Contract Create Error: ${data.error}`)
        }

        changeModetoList()
    }

    const updateRatesheet = async (id: string, dealer: number, agent: number, claimReserve: number, processingFee: number) => {
        const res = await fetch('/api/ratesheet/updateRatesheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                dealer: dealer,
                agent: agent,
                claimReserve: claimReserve,
                processingFee: processingFee
            })
        })

        const data = await res.json()
        console.table(data)
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
            {active === 'Create' && (<CreateContractUI back={changeModetoList} createContract={createContract} customersList={customers} searchCustomer={getCustomers} />)}

            {/* Create */}
            {active === 'List' && (<ContractsListUI addAgent={changeModetoCreate} contract={contracts} getContracts={() => { getContracts }} totalContracts={totalContracts} totalPremium={totalPremium} changeModetoDetails={changeModetoDetails} />)}

            {/* Details */}
            {active === 'Details' && contract && (<ContractDetailsUI changeModetoList={changeModetoList} contract={contract} updateRatesheet={updateRatesheet} />)}
        </div>
    )
}