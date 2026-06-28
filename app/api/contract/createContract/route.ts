import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    try {
        const body = await req.json();

        const {
            customerId,
            policType,
            vehicleNumber,
            vehicleModel,
            startDate,
            endDate,
            paymentFrequency,
            premiumAmmount,
        } = body;

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
                        "customerId, policType, vehicleNumber, vehicleModel, startDate, endDate, paymentFrequency and premiumAmmount are required",
                },
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
            })
            .select()
            .single();

        if (error) {
            console.log(error.message);

            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}