import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return ( 
    <SidebarProvider defaultOpen className="bg-white has-data-[variant=inset]:bg-white">
      <DashboardSidebar />
      <SidebarInset className="intel-shell bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.96)] md:m-0 md:ml-0 md:rounded-none md:shadow-none">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
 
export default Layout;
