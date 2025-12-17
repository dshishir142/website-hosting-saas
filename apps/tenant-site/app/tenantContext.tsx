"use client";

import { createContext, useContext, ReactNode } from "react";

interface Tenant {
  id: string;
  name: string;
  email: string;
  subdomain: string;
}

interface TenantProviderProps {
  tenant: Tenant;
  children: ReactNode;
}

const TenantContext = createContext<Tenant | null>(null);

export const TenantProvider = ({ tenant, children }: TenantProviderProps) => {
  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
