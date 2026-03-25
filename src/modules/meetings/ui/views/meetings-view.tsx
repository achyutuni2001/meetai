"use client";

import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarDaysIcon,
  Clock3Icon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataPagination } from "@/components/data-pagination";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDuration } from "@/lib/utils";

import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { MeetingStatus } from "../../types";
import { NewMeetingDialog } from "../components/new-meeting-dialog";

const statusClasses: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  upcoming: "bg-amber-100 text-amber-700",
  processing: "bg-slate-100 text-slate-700",
  active: "bg-sky-100 text-sky-700",
  cancelled: "bg-rose-100 text-rose-700",
};

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const [openNewMeetingDialog, setOpenNewMeetingDialog] = useState(false);

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
  }));
  
  return (
    <div className="intel-page gap-4">
      <NewMeetingDialog open={openNewMeetingDialog} onOpenChange={setOpenNewMeetingDialog} />
      <section className="intel-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Meetings
            </h1>
            <p className="mt-2 text-base text-slate-500">
              Manage the meeting list, schedule sessions, and jump into calls from one place.
            </p>
          </div>
          <Button
            onClick={() => setOpenNewMeetingDialog(true)}
            className="h-11 rounded-full bg-[#3e80f0] px-5 text-sm shadow-[0_10px_18px_rgba(62,128,240,0.2)] hover:bg-[#2f72e6]"
          >
            <CalendarDaysIcon className="size-4" />
            Schedule Meeting
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-[#e1ebfb] pt-4 lg:flex-row">
          <div className="relative w-full lg:max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
              placeholder="Filter by name"
              className="intel-filter pl-11"
            />
          </div>
          <select
            value={filters.status ?? ""}
            onChange={(e) => setFilters({ status: (e.target.value || null) as MeetingStatus | null, page: 1 })}
            className="intel-filter lg:w-40"
          >
            <option value="">Status</option>
            {Object.values(MeetingStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            value={filters.agentId}
            onChange={(e) => setFilters({ agentId: e.target.value, page: 1 })}
            className="intel-filter lg:w-40"
          >
            <option value="">Agent</option>
            {data.items.map((meeting) => (
              <option key={meeting.agent.id} value={meeting.agent.id}>
                {meeting.agent.name}
              </option>
            ))}
          </select>
          <Link href="/calendar" className="intel-chip justify-center lg:ml-auto">
            Weekly calendar
          </Link>
        </div>
      </section>

      <section className="intel-panel overflow-hidden">
        <div className="divide-y divide-[#e5eefc]">
          {data.items.map((meeting) => {
            const scheduled = meeting.startedAt ?? meeting.createdAt;
            const durationLabel = meeting.duration ? formatDuration(meeting.duration) : "Not Started";

            return (
              <button
                key={meeting.id}
                type="button"
                onClick={() => router.push(`/meetings/${meeting.id}`)}
                className="grid w-full gap-4 px-5 py-4 text-left transition hover:bg-[#f8fbff] lg:grid-cols-[1.45fr_1.1fr_auto_auto]"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-slate-900">
                    {meeting.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2 text-[13px] text-slate-500">
                    <span className="text-sm">↳</span>
                    <span className="truncate">{meeting.agent.name}</span>
                    <GeneratedAvatar
                      variant="botttsNeutral"
                      seed={meeting.agent.name}
                      className="size-4 border border-[#d7e5ff]"
                    />
                    <span>{format(scheduled, "MMM d")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7aa2f1]">
                    Scheduled
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-slate-800">
                    {format(meeting.startedAt ?? meeting.createdAt, "EEE, MMM d")} · {meeting.startedAt ? format(meeting.startedAt, "p") : "No time scheduled"}
                  </div>
                  <div className="mt-1 text-[13px] text-slate-500">
                    {meeting.endedAt && meeting.startedAt ? `${format(meeting.startedAt, "p")} - ${format(meeting.endedAt, "p")}` : "Add a time from the edit dialog."}
                  </div>
                </div>
                <div className="lg:justify-self-center">
                  <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium capitalize ${statusClasses[meeting.status] ?? "bg-slate-100 text-slate-700"}`}>
                    {meeting.status}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7aa2f1]">
                    Call length
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#d9e4fb] bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
                    <Clock3Icon className="size-3.5 text-[#4c78cf]" />
                    {durationLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a fews econds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong"
    />
  )
}
