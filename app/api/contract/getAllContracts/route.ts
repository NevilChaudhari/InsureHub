import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const supabase = await createClient();

    try {
        const { count, error } = await supabase
            .from("contracts")
            .select('*', { count: 'exact', head: true });


        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({ count });
    } catch (error) {
        console.error(`err: ${error}`);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}