import { useEffect, useState } from "react";
import RolesUI from "./rolesUI";

interface Role {
    id: string,
    name: string
}

interface RoleUserCount {
    role: Role
    count: number,
}

interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    role: string;
}

export default function RolesPermissions() {

    const [roles, setRoles] = useState<Role[]>([])
    const [selectedRoleUsers, setSelectedRoleUsers] = useState<User[]>([])
    const [selectedRoleUsersCount, setSelectedRoleUsersCount] = useState<RoleUserCount[]>([])

    useEffect(() => {
        getRoles()
    }, [])

    useEffect(() => {
        getRoleUsersCount(roles)
    }, [roles])

    const getRoles = async () => {
        const res = await fetch('/api/roles/getRoles', {
            method: 'POST'
        })

        const data = await res.json()

        if (data.error) {
            console.log(`Roles fetch error: ${data.error}`)
            return;
        }
        setRoles(data)
    }

    const getRoleUsers = async (role: string) => {
        const res = await fetch('/api/roles/getRoleUsers', {
            method: 'POST',
            body: JSON.stringify({
                role: role
            })
        })

        const data = await res.json()

        if (data.error) {
            console.log(`Roles Users fetch error: ${data.error}`)
            return;
        }
        setSelectedRoleUsers(data)
    }

    const getRoleUsersCount = async (roles: Role[]) => {
        const res = await fetch('/api/roles/countUsersOfAllRoles', {
            method: 'POST',
            body: JSON.stringify({
                roles
            })
        })

        const data = await res.json()

        if (data.error) {
            console.log(`Roles Users Count fetch error: ${data.error}`)
            return;
        }
        setSelectedRoleUsersCount(data)
        console.log(JSON.stringify(data))
    }

    return <div className="">
        <RolesUI roles={roles!} selectedRoleUsers={selectedRoleUsers} getRoleUsers={getRoleUsers} selectedRoleUsersCount={selectedRoleUsersCount} />
    </div>
}