import Link from "next/link";
import { format } from "date-fns";
import { ChevronRightIcon, TrashIcon, PencilIcon, MoreVerticalIcon, CalendarClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  meetingId: string;
  meetingName: string;
  startedAt?: string | Date | null;
  endedAt?: string | Date | null;
  onEdit: () => void;
  onRemove: () => void;
}

export const MeetingIdViewHeader = ({
  meetingId,
  meetingName,
  startedAt,
  endedAt,
  onEdit,
  onRemove
}: Props) => {
  const startedAtDate = startedAt ? new Date(startedAt) : null;
  const endedAtDate = endedAt ? new Date(endedAt) : null;

  return (
    <div className="intel-panel p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-sm font-medium text-slate-500">
              <Link href="/meetings">
                Meetings
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-400 [&>svg]:size-4">
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-sm font-medium text-slate-900">
              <Link href={`/meetings/${meetingId}`}>
                {meetingName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
            {meetingName}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <CalendarClockIcon className="size-4 text-[#7aa2f1]" />
            <span>
              {startedAtDate ? `${format(startedAtDate, "EEE, MMM d")} · ${format(startedAtDate, "p")}` : "No meeting time scheduled"}
              {startedAtDate && endedAtDate ? ` - ${format(endedAtDate, "p")}` : ""}
            </span>
          </div>
        </div>
      {/* Without modal={false}, the dialog that this dropdown opens cause the website to get unclickable */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <PencilIcon className="size-4 text-black" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemove}>
              <TrashIcon className="size-4 text-black" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
