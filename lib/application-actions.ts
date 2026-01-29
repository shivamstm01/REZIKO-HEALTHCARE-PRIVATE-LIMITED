'use server';

import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitApplication(formData: FormData) {
    const jobId = formData.get("jobId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    // Resume upload requires Storage, we will just simulate/store text for now as placeholder
    const resumeUrl = "https://example.com/resume-placeholder.pdf";

    await addDoc(collection(db, "applications"), {
        jobId,
        name,
        email,
        phone,
        resumeUrl,
        appliedAt: new Date().toISOString()
    });

    redirect("/career?applied=true");
}
