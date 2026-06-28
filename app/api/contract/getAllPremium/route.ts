import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from("contracts")
            .select("premiumAmmount");

        const total = data!.reduce(
            (sum, row) => sum + (Number(row.premiumAmmount) || 0),
            0
        );

        console.log(total);


        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({ total });
    } catch (error) {
        console.error(`err: ${error}`);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}