import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateForm from "@/components/update-form";

export default async function UpdateProfilePage() {
  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    session = null;
  }

  if (!session) {
    redirect("/signin?reason=protected&next=/profile/update");
  }

  return <UpdateForm currentName={session.user.name} />;
}
