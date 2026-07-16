import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from("roles")
            .select('*');


        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(`err: ${error}`);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}