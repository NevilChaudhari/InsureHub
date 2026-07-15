import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    try {
        const body = await req.json();

        const {
            isNewCustomer,
            customerId,
            name,
            email,
            phone,
            address,
            policType,
            vehicleNumber,
            vehicleModel,
            startDate,
            endDate,
            paymentFrequency,
            premiumAmmount,
        } = body;

        if (isNewCustomer) {
            if (
                !name ||
                !email ||
                !phone ||
                !address ||
                !policType ||
                !vehicleNumber ||
                !vehicleModel ||
                !startDate ||
                !endDate ||
                !paymentFrequency ||
                !premiumAmmount
            ) {
                return NextResponse.json(
                    {
                        error:
                            "customerId, policType, vehicleNumber, vehicleModel, startDate, endDate, paymentFrequency and premiumAmmount are required",
                    },
                    { status: 400 }
                );
            }
        } else {
            if (
                !customerId ||
                !policType ||
                !vehicleNumber ||
                !vehicleModel ||
                !startDate ||
                !endDate ||
                !paymentFrequency ||
                !premiumAmmount
            ) {
                return NextResponse.json(
                    {
                        error:
                            `${customerId}, ${policType}, ${vehicleNumber}, ${vehicleModel}, ${startDate}, ${endDate}, ${paymentFrequency} and ${premiumAmmount} are required`,
                    },
                    { status: 400 }
                );
            }
        }

        if (isNewCustomer) {
            const { data: customerData, error: customerError } = await supabase
                .from("customers")
                .insert([
                    {
                        name: body.name,
                        email: body.email,
                        phone: body.phone,
                        address: body.address,
                    },
                ])
                .select()
                .single();

            if (customerError) {
                console.log(`--=> customerError: ${customerError.message}`);

                return NextResponse.json(
                    { error: customerError.message },
                    { status: 400 }
                );
            }

            const { data: rateSheetData, error: rateSheetError } = await supabase
                .from("ratesheet")
                .insert([{}])
                .select()
                .single();

            if (rateSheetError) {
                console.log(`--=> rateSheetError: ${rateSheetError.message}`);

                return NextResponse.json(
                    { error: rateSheetError.message },
                    { status: 400 }
                );
            }

            const { data, error } = await supabase
                .from("contracts")
                .insert({
                    customerId: customerData.id,
                    policyType: policType,
                    vehicleNumber: vehicleNumber,
                    vehicleModel: vehicleModel,
                    startDate: startDate,
                    endDate: endDate,
                    paymentFrequency: paymentFrequency,
                    premiumAmmount: premiumAmmount,
                    ratesheet: rateSheetData.id
                })
                .select()
                .single();

            if (error) {
                console.log(`--=> contractError: ${error.message}`);

                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
            return NextResponse.json(data, {
                status: 201,
            });
        } else {
            const { data: rateSheetData, error: rateSheetError } = await supabase
                .from("ratesheet")
                .insert([{}])
                .select()
                .single();

            if (rateSheetError) {
                console.log(`--=> rateSheetError: ${rateSheetError.message}`);

                return NextResponse.json(
                    { error: rateSheetError.message },
                    { status: 400 }
                );
            }

            const { data, error } = await supabase
                .from("contracts")
                .insert({
                    customerId: customerId,
                    policyType: policType,
                    vehicleNumber: vehicleNumber,
                    vehicleModel: vehicleModel,
                    startDate: startDate,
                    endDate: endDate,
                    paymentFrequency: paymentFrequency,
                    premiumAmmount: premiumAmmount,
                    ratesheet: rateSheetData.id
                })
                .select()
                .single();

            if (error) {
                console.log(`--=> contractError: ${error.message}`);

                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
            return NextResponse.json(data, {
                status: 201,
            });
        }



    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}