import { createClient } from "@/prismicio";
import React from "react";
import NavBar from "./NavBar";

export default async function Header() {
  const client = createClient();
  const setting = await client.getSingle("settings");
  return (
    <header>
      <NavBar settings={setting} />
    </header>
  );
}
