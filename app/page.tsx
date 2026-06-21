'use client'

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "./Dashboard/page";

export default function Home() {

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, } = await supabase.auth.getUser()

      // alert(JSON.stringify(user))
      if (!user) {
        redirect('/auth')
      }
    }

    getUser()
  }, [])

  return (
    <MainLayout />
  );
}
