import { LoadingState } from "@/components/loading-state";
import { AgentsView ,AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { trpc, getQueryClient } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = async () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <AgentsView />
                </Suspense>
            
        </HydrationBoundary>
    );
}

export default Page;