import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    try {

        const { data, error } = await supabase
            .from("customers")
            .select('*')
            .eq('id', body.id)
            .single();

        if (error) {
            console.log(`specific customer error: ${JSON.stringify(error)}`);
            
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