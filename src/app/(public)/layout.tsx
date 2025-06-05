import Divider from "@/components/common/divider";
import Footer from "@/components/footer/site-footer";
import MainHeader from "@/components/header/site-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border-grid flex flex-1 flex-col dark:bg-gray-900">
      <MainHeader />
      <main className="flex flex-1 flex-col dark:bg-gray-900">{children}</main>
      <Divider />
      <Footer />
      <div className="pointer-events-none absolute -top-20 -left-32 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 opacity-50 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 opacity-30 blur-2xl dark:bg-blue-400/5" />
    </div>
  );
}
