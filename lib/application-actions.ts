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
    // Resume Handling
    const resumeFile = formData.get("resume") as File;
    let resumeBase64 = null;

    if (resumeFile && resumeFile.size > 0) {
        if (resumeFile.size > 800 * 1024) {
            console.error("Resume too large (>800KB)");
            // In a real app, we should return an error state to the client
            // returning early for now or just not saving the file
        } else if (resumeFile.type !== "application/pdf") {
            console.error("Invalid file type. Must be PDF.");
        } else {
            const buffer = await resumeFile.arrayBuffer();
            resumeBase64 = `data:${resumeFile.type};base64,${Buffer.from(buffer).toString('base64')}`;
        }
    }

    await addDoc(collection(db, "applications"), {
        jobId,
        name,
        email,
        phone,
        resumeData: resumeBase64, // Storing Base64 directly in Firestore (limit: 1MB doc size)
        appliedAt: new Date().toISOString()
    });

    redirect("/career?applied=true");
}
