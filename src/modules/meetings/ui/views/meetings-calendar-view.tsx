"use client";

import { useMemo, useState } from "react";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";

import { NewMeetingDialog } from "../components/new-meeting-dialog";

const statusTone: Record<string, string> = {
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  upcoming: "border-amber-200 bg-amber-50 text-amber-700",
  processing: "border-slate-200 bg-slate-50 text-slate-700",
  active: "border-sky-200 bg-sky-50 text-sky-700",
  cancelled: "border-rose-200 bg-rose-50 text-rose-700",
};

export const MeetingsCalendarView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      page: 1,
      pageSize: 100,
      search: "",
      status: null,
      agentId: "",
    }),
  );

  const [referenceDate, setReferenceDate] = useState(new Date());
  const [openNewMeetingDialog, setOpenNewMeetingDialog] = useState(false);

  const weekStart = startOfWeek(referenceDate, { weekStartsOn: 0 });
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  const scheduledMeetings = data.items
    .map((meeting) => ({
      ...meeting,
      start: new Date(meeting.startedAt ?? meeting.createdAt),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const weekMeetings = scheduledMeetings.filter((meeting) =>
    days.some((day) => isSameDay(day, meeting.start)),
  );

  const nextMeeting = weekMeetings.find((meeting) => meeting.status !== "completed");

  return (
    <div className="intel-page gap-6">
      <NewMeetingDialog open={openNewMeetingDialog} onOpenChange={setOpenNewMeetingDialog} />
      <section className="intel-panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Calendar
            </h1>
            <p className="mt-3 text-lg text-slate-500">
              Open the weekly planner directly and schedule meetings faster.
            </p>
          </div>
          <Button
            onClick={() => setOpenNewMeetingDialog(true)}
            className="h-14 rounded-full bg-[#3e80f0] px-6 text-base shadow-[0_12px_22px_rgba(62,128,240,0.22)] hover:bg-[#2f72e6]"
          >
            <CalendarIcon className="size-5" />
            Schedule Meeting
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <div className="intel-panel p-5">
          <span className="intel-chip mb-4">Calendar</span>
          <h2 className="text-2xl font-semibold text-slate-900">Weekly planning board</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Pick a day, scan the week, and keep unscheduled meetings visible.
          </p>

          <div className="mt-6 rounded-[24px] border border-[#e0ebfd] bg-[#f7faff] p-5">
            <div className="mb-4 flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={() => setReferenceDate(addDays(referenceDate, -7))}>
                <ChevronLeftIcon className="size-4" />
              </Button>
              <div className="text-sm font-medium text-slate-800">{format(referenceDate, "MMMM yyyy")}</div>
              <Button variant="ghost" size="icon" onClick={() => setReferenceDate(addDays(referenceDate, 7))}>
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                <div key={day}>
                  <div>{day}</div>
                  <div className={`mt-2 mx-auto flex size-8 items-center justify-center rounded-full text-sm ${isSameDay(days[index], new Date()) ? "bg-[#d9e8ff] text-[#2f72e6]" : "text-slate-700"}`}>
                    {format(days[index], "d")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-[#e0ebfd] bg-[#f7faff] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7aa2f1]">This week</div>
            <div className="mt-3 text-4xl font-semibold text-slate-900">{weekMeetings.length}</div>
            <p className="mt-2 text-sm text-slate-500">
              Meetings scheduled between {format(days[0], "MMM d")} and {format(days[6], "MMM d")}.
            </p>
          </div>

          <div className="mt-4 rounded-[24px] border border-[#e0ebfd] bg-[#f7faff] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7aa2f1]">Next up</div>
            {nextMeeting ? (
              <div className="mt-3 text-sm text-slate-600">
                <p className="font-medium text-slate-900">
                  {format(nextMeeting.start, "EEE, MMM d")} · {format(nextMeeting.start, "p")}
                </p>
                <p className="mt-2">{nextMeeting.name}</p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">No upcoming meetings scheduled this week.</p>
            )}
          </div>
        </div>

        <div className="intel-panel p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7aa2f1]">
                Week of {format(days[0], "MMM d")}
              </div>
              <h2 className="mt-2 text-4xl font-semibold text-slate-900">
                {format(days[0], "MMM d")} - {format(days[6], "MMM d")}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Outlook-style schedule view for planned meeting time blocks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-full">Today</Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setReferenceDate(addDays(referenceDate, -7))}>
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setReferenceDate(addDays(referenceDate, 7))}>
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-0 overflow-hidden rounded-[24px] border border-[#e5eefc]">
            {days.map((day) => {
              const dayMeetings = weekMeetings.filter((meeting) => isSameDay(day, meeting.start));

              return (
                <div key={day.toISOString()} className="min-h-[560px] border-r border-[#e5eefc] last:border-r-0">
                  <div className="border-b border-[#e5eefc] px-4 py-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9db1da]">
                      {format(day, "EEE")}
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-slate-900">{format(day, "d")}</div>
                  </div>
                  <div className="space-y-3 p-3">
                    {dayMeetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className={`rounded-2xl border p-3 text-xs shadow-sm ${statusTone[meeting.status] ?? "border-slate-200 bg-slate-50 text-slate-700"}`}
                      >
                        <div className="truncate font-semibold">{meeting.name}</div>
                        <div className="mt-2 truncate text-[11px] opacity-80">
                          {meeting.agent.name}
                        </div>
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
                          {meeting.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
