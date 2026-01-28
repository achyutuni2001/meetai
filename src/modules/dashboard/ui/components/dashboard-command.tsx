import { Dispatch, SetStateAction } from "react"

import { 
     CommandDialog,
     CommandInput, 
     CommandItem, 
     CommandList, 
     CommandResponsiveDialog } from "@/components/ui/command" //custom made component

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DashboardCommand = ({open, setOpen}: Props) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Find a meeting or agent"/>
            <CommandList>
                <CommandItem>
                    Test 1
                </CommandItem>    
                <CommandItem>
                    Test 2
                </CommandItem> 
            </CommandList>
        </CommandResponsiveDialog>
    );
};

