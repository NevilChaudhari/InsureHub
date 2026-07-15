import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    try {

        const { data, error } = await supabase
            .from("customers")
            .select('*')
            .range(body.start - 1, body.end - 1)
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