import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    try {
        const body = await req.json();

        if (!body.name || !body.email || !body.phone) {
            return NextResponse.json(
                { error: "Name, email and phone are required" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("agents")
            .insert([
                {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                },
            ])
            .select()
            .single();

        if (error) {
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