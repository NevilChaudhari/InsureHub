import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    try {
        const body = await req.json();

        if (!body.name || !body.email || !body.phone || !body.password) {
            return NextResponse.json(
                { error: "Name, email and phone are required" },
                { status: 400 }
            );
        }

        console.log('start addAgent-------')

        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert([
                {
                    name: body.name,
                    email: body.email,
                    role: body.role,
                    id: body.id
                },
            ])
            .select()
            .single();

        if (userError) {
            console.log(userError.message);

            return NextResponse.json(
                { error: userError.message },
                { status: 400 }
            );
        }

        const { data: agentData, error: agentError } = await supabase
            .from("agents")
            .insert([
                {
                    phone: body.phone,
                    userId: userData.id
                },
            ])
            .select()
            .single();

        if (agentError) {
            console.log(agentError.message);

            return NextResponse.json(
                { error: agentError.message },
                { status: 400 }
            );
        }

        console.log('end addAgent-------')

        return NextResponse.json(agentData, {
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