import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    try {
        const { count, error } = await supabase
            .from("claims")
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