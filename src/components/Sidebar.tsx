"use server";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

async function getWorkspaces() {
  let token = "";
  return axios
    .get("http://localhost:8080/v1/workspaces", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      return data.body;
    })
    .catch((err) => console.log(err));
}

async function Sidebar() {
  const workspaces = await getWorkspaces();
  return (
    <aside className="bg-white border-r">
      <header className="h-[80px] flex gap-4 border-b p-4">
        <Avatar className="rounded-lg">
          <AvatarFallback className="rounded-lg"></AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="text-xs">Рабочее пространство</span>
            <Badge variant="secondary">Free</Badge>
          </div>
          <h2 className="font-bold text-xl">
            {workspaces && workspaces[0].title}
          </h2>
        </div>
      </header>
      <main className="flex flex-col p-4 gap-8">
        <Input placeholder="Поиск" />
        <div className="border-b"></div>
        {/*{workspaces[0].projects.map((project) => (*/}
        {/*  <li key={project.id}>{project.title}</li>*/}
        {/*))}*/}
      </main>
    </aside>
  );
}

export default Sidebar;
