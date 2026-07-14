import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/admin";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            name,
        },
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
}