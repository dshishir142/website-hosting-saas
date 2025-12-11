import NavBar from "../navbar/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <NavBar />
        {children}
      </>
  );
}