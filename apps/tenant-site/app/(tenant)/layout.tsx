import { headers } from "next/headers";
import { TenantProvider } from "../tenantContext";

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const hostName = (await headers()).get('host') || '';
  const subdomain = hostName.split('.')[0];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/check/${subdomain}`);
  const data = await res.json();

  return <TenantProvider tenant={data.data}>{children}</TenantProvider>;
}
