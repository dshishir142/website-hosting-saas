"use client"

import { useTenant } from "../tenantContext"

export default function TenantHome(){

    const tenant = useTenant();
    return(
        <>{tenant.name}</>
    )
}