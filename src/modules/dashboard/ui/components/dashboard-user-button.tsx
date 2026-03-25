import { useRouter } from "next/navigation";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        }
      }
    })
  }

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="mx-1 mb-1 flex w-full items-center justify-between gap-x-3 overflow-hidden rounded-[24px] border border-white/10 bg-white/6 p-3 hover:bg-white/10 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:p-1.5">
          {data.user.image ? (
            <Avatar className="size-9 group-data-[collapsible=icon]:size-full">
              <AvatarImage src={data.user.image} alt={data.user.name} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3 group-data-[collapsible=icon]:mr-0 group-data-[collapsible=icon]:size-full"
            />
          )}
          <div className="flex flex-1 min-w-0 flex-col gap-0.5 overflow-hidden text-left group-data-[collapsible=icon]:hidden">
            <p className="text-sm truncate w-full">
              {data.user.name}
            </p>
            <p className="text-xs truncate w-full">
              {data.user.email}
            </p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => {}}
            >
              <CreditCardIcon className="size-4 text-black" />
              Billing
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
            >
              <LogOutIcon className="size-4 text-black" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-1 mb-1 flex w-full items-center justify-between gap-x-3 overflow-hidden rounded-[24px] border border-white/10 bg-white/6 p-3 hover:bg-white/10 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:p-1.5">
       {data.user.image ? (
          <Avatar className="size-9 group-data-[collapsible=icon]:size-full">
            <AvatarImage src={data.user.image} alt={data.user.name} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3 group-data-[collapsible=icon]:mr-0 group-data-[collapsible=icon]:size-full"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left group-data-[collapsible=icon]:hidden">
          <p className="w-full truncate text-sm font-medium text-white">
            {data.user.name}
          </p>
          <p className="w-full truncate text-xs text-blue-100/70">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0 text-blue-100/70 group-data-[collapsible=icon]:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
        >
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
