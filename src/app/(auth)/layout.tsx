export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c4a45] via-[#3d5a52] to-[#4a6b62] flex items-center justify-center p-4">
      {children}
    </div>
  );
}
