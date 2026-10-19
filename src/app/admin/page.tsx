import { redirect } from "next/navigation";

/** Bare /admin has no view of its own — send it to the reservations list. */
export default function AdminIndex() {
  redirect("/admin/whitelist");
}
