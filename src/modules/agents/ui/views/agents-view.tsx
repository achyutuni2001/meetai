"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";



export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
        {JSON.stringify(data, null, 2)}
    </div>
  );
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            decription="Please wait while we load the agents for you."
        />
        
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState
                title="Failed to load agents"
                decription="There was an error while fetching the agents. Please try again."
            />
    )
}