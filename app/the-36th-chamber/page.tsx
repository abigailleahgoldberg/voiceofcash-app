import type { Metadata } from "next";
import WarRoomClient from "./WarRoomClient";

export const metadata: Metadata = {
  title: "The 36th Chamber, Voice of Cash War Room | The Voice of Cash",
  description: "Go inside the 36th Chamber. Nine AI agents. One war room. Real-time operations running 24/7 for Las Vegas businesses.",
  openGraph: {
    title: "The 36th Chamber, Voice of Cash War Room",
    description: "Nine autonomous AI agents running live. Watch the Voice of Cash Clan operate in real time.",
    url: "https://thevoiceofcash.com/the-36th-chamber",
  },
};

export default function Page() {
  return <WarRoomClient />;
}
