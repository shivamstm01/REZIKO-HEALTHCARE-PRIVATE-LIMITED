'use server';

import { db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const priceString = formData.get("price") as string;
    const price = priceString ? parseFloat(priceString) : null;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string;

    // Image Handling
    const imageFile = formData.get("image") as File;
    let imageBase64 = "";
    if (imageFile && imageFile.size > 0) {
        if (imageFile.size > 150 * 1024) {
            console.error("Image too large (>150KB)");
            // We could throw, but for now let's just ignore or log. 
            // Ideally client side prevents this.
        } else {
            const buffer = await imageFile.arrayBuffer();
            imageBase64 = `data:${imageFile.type};base64,${Buffer.from(buffer).toString('base64')}`;
        }
    }

    try {
        await addDoc(collection(db, "products"), {
            name,
            price, // can be null
            type,
            description,
            videoUrl,
            imageUrl: imageBase64,
            createdAt: new Date().toISOString()
        });
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            console.error("\n\n!!! FIREBASE PERMISSION DENIED !!!");
            console.error("You MUST update your Firestore Security Rules in the Firebase Console.");
            console.error("Go to: https://console.firebase.google.com/project/cspwala-c99b1/firestore/rules");
            console.error("Set rules to: allow read, write: if true;\n\n");
        }
        throw error;
    }

    revalidatePath("/products");
    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    await deleteDoc(doc(db, "products", id));
    revalidatePath("/products");
    revalidatePath("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const priceString = formData.get("price") as string;
    const price = priceString ? parseFloat(priceString) : null;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string;

    const dataToUpdate: any = {
        name,
        price,
        type,
        description,
        videoUrl,
        updatedAt: new Date().toISOString()
    };

    // Only update image if a new one is uploaded
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size > 0 && imageFile.size <= 150 * 1024) {
        const buffer = await imageFile.arrayBuffer();
        dataToUpdate.imageUrl = `data:${imageFile.type};base64,${Buffer.from(buffer).toString('base64')}`;
    }

    await updateDoc(doc(db, "products", id), dataToUpdate);

    revalidatePath("/products");
    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function createJob(formData: FormData) {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const experience = formData.get("experience") as string;
    const description = formData.get("description") as string;

    await addDoc(collection(db, "jobs"), {
        title,
        location,
        type,
        experience, // Added experience
        description,
        createdAt: new Date().toISOString()
    });

    revalidatePath("/career");
    revalidatePath("/admin/jobs");
    redirect("/admin/jobs");
}

export async function deleteJob(id: string) {
    await deleteDoc(doc(db, "jobs", id));
    revalidatePath("/career");
    revalidatePath("/admin/jobs");
}
