import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

interface Role {
    id: string,
    name: string
}

export async function POST(req: Request) {
    const supabase = await createClient();

    try {
        const { roles } = await req.json();

        if (!Array.isArray(roles)) {
            return NextResponse.json(
                { error: "roles must be an array" },
                { status: 400 }
            );
        }

        const counts = await Promise.all(
            roles.map(async (role: Role) => {
                const { count, error } = await supabase
                    .from("users")
                    .select("*", { count: "exact", head: true })
                    .eq("role", role.name);

                if (error) throw error;

                return {
                    role,
                    count,
                };
            })
        );

        return NextResponse.json(counts);
    } catch (error) {
        console.error(`err: ${error}`);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}