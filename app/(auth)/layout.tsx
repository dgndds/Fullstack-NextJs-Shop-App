export default function Layout_Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full p-6">
      {children}
    </div>
  );
}
