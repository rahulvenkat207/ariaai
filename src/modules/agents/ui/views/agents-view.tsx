"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";  
import { DataTable } from "../components/data-table";
import { EmptyState } from "@/components/empty-sate";
import { columns } from "../components/columns";
import { AgentGetOne } from "../../types";
const mockData : AgentGetOne []=[
 {
    id:"728ed52f",
    name:"test",
    createdAt:"2025-01-01",
    updatedAt:"2025-01-01",
    userId:"test",
    instructions:"test",
    meetingCount:10
}
]
    export const AgentsView = () => {
    const trpc = useTRPC();

    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            
              <DataTable  data={data} columns={columns} />
              {data.length===0 &&(
                <EmptyState title="create your first agent" description="Create an agent to join your meeting. Each agent will follow your instructions and can interact with participants during the meeting the call."/>
              )}
            
        </div>
    )

};  

export const AgentsViewLoading = () => {
    return (
       <LoadingState title="Loading Agents" description="This may take few seconds" />
    )
}
