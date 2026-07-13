import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    try {
        const body = await req.json();

        const { data, error } = await supabase
            .from("ratesheet")
            .update([
                {
                    dealer: body.dealer,
                    agent: body.agent,
                    claimReserve: body.claimReserve,
                    processingFee: body.processingFee,
                },
            ])
            .eq('id', body.id)
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