"use client";

import { useState } from "react";
import { VideoIcon, Trash2Icon, SearchIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { DataPagination } from "../components/data-pagination";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { NewAgentDialog } from "../components/new-agent-dialog";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));

  return (
    <div className="intel-page gap-4">
      <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
      <section className="intel-panel p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <select className="intel-filter md:w-36">
              <option>Select all</option>
            </select>
            <div className="relative w-full max-w-md">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
                placeholder="Filter by name"
                className="intel-filter pl-11"
              />
            </div>
          </div>
          <Button
            onClick={() => setOpenNewAgentDialog(true)}
            className="h-11 rounded-full bg-[#3e80f0] px-5 text-sm shadow-[0_10px_18px_rgba(62,128,240,0.2)] hover:bg-[#2f72e6]"
          >
            <PlusIcon className="size-4" />
            New Agent
          </Button>
        </div>
      </section>

      <section className="intel-panel overflow-hidden">
        <div className="divide-y divide-[#e5eefc]">
          {data.items.map((agent) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => router.push(`/agents/${agent.id}`)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#f8fbff]"
            >
              <div className="flex min-w-0 items-start gap-4">
                <GeneratedAvatar
                  variant="botttsNeutral"
                  seed={agent.name}
                  className="mt-0.5 size-10 border border-[#d7e5ff] bg-white"
                />
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-slate-900">
                    {agent.name}
                  </h3>
                  <p className="mt-1 max-w-xl truncate text-[13px] text-slate-500">
                    {agent.instructions}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="intel-chip whitespace-nowrap text-xs">
                  <VideoIcon className="size-4 text-[#4c78cf]" />
                  {agent.meetingCount} meetings
                </span>
                <span className="hidden items-center gap-2 text-xs font-medium text-rose-500 md:inline-flex">
                  <Trash2Icon className="size-3.5" />
                  Delete
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a fews econds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"
    />
  )
}
