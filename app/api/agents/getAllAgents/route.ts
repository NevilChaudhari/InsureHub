import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from("agents")
            .select('*')
            .order('id', { ascending: true })

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}