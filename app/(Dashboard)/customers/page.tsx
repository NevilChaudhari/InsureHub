'use client'

import { useEffect, useState } from "react";
import CustomersListUI from "./CustomersListUI";
import CustomerDetailsUI from "./CustomerDetailsUI";

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
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
}

const defaultContract = {
    id: 'loading...',
    policyType: 'loading...',
    vehicleNumber: 'loading...',
    vehicleModel: 'loading...',
    paymentFrequency: 0,
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    premiumAmmount: 'loading...',
    customerId: 'loading...',
}

const defaultCustomer = {
    id: 'loading...',
    name: 'loading...',
    email: 'loading...',
    phone: 'loading...',
    address: 'loading...',
}

type Mode = 'List' | 'Details';

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [specificCustomer, setSpecificCustomer] = useState<Customer>()
    const [specificCustomerDetails, setSpecificCustomerDetails] = useState<Customer>(defaultCustomer)
    const [specificCustomerContracts, setSpecificCustomerContracts] = useState<Contract[]>()
    const [totalCustomers, setTotalCustomers] = useState<number>(0)
    const [mode, setMode] = useState<Mode>('List')

    const getAllContracts = async () => {
        const res = await fetch('/api/customers/getTotalCustomers')
        const data = await res.json()
        setTotalCustomers(data.count)
    }

    useEffect(() => { 
        getAllContracts()
    },[customers])

    const selectCustomer = (customer: Customer) => {
        setSpecificCustomer(customer)
    }

    const changeMode = () => {
        if (mode === 'List') {
            setMode('Details')
        } else {
            setMode('List')
        }
    }

    const getCustomers = async (start: number, end: number) => {
        try {
            const res = await fetch('/api/customers/getCustomers', {
                method: 'POST',
                body: JSON.stringify({
                    start: start,
                    end: end
                })
            })

            const data = await res.json()
            if (data.error) {
                console.log(`Customer List Error: ${data.error}`)
                return;
            }

            setCustomers(data)
        } catch (error) {
            console.log(`Customer List Can't Fetch: ${error}`)
        }
    }

    useEffect(() => {
        if (!specificCustomer) {
            console.log('No Specific Customer Selected')
            return;
        }
        const getSpecificCustomer = async (id: string) => {
            try {
                const res = await fetch('/api/customers/getSpecificCustomer', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: id
                    })
                })

                const data = await res.json()
                if (data.error) {
                    console.log(`Specific Customer Details Error: ${data.error}`)
                    return;
                }

                setSpecificCustomerDetails(data)
            } catch (error) {
                console.log(`Specific Customer Details Can't Fetch: ${error}`)
            }
        }

        const getSpecificCustomerContracts = async (start: number, end: number) => {
            try {
                const res = await fetch('/api/customers/getSpecificCustomerContracts', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: specificCustomer.id,
                        start: start,
                        end: end
                    })
                })

                const data = await res.json()
                if (data.error) {
                    console.log(`Specific Customer Contracts Error: ${data.error}`)
                    return;
                }

                setSpecificCustomerContracts(data)
            } catch (error) {
                console.log(`Specific Customer Contracts Can't Fetch: ${error}`)
            }
        }

        getSpecificCustomer(specificCustomer.id)
        getSpecificCustomerContracts(0, 10)
        changeMode()
    }, [specificCustomer])

    return <div className="">
        {mode === 'List' && (<CustomersListUI customers={customers} getCustomers={getCustomers} totalCustomers={totalCustomers} selectCustomer={selectCustomer} />)}
        {mode === 'Details' && (<CustomerDetailsUI changeMode={changeMode} contracts={specificCustomerContracts!} customer={specificCustomerDetails!} />)}
    </div>
}