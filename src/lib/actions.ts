"use server";

import { db } from "@/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// create zod schema
const FormSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: "A valid Email is required." }),
  isSubscribed: z.boolean(),
});

// omit the props you dont need
const CreateSubscriber = FormSchema.omit({ id: true, isSubscribed: true });

type State = {
  errors?: {
    email?: string[];
  };
  message?: string | null;
};

export async function createSubscriber(prevState: State, formData: FormData) {
  //console.log("Raw Form Data: ", formData.get("email"));

  const validatedField = await CreateSubscriber.safeParseAsync({
    email: formData.get("email"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: "Email is Required",
    };
  }

  // get email
  const { email } = validatedField.data;

  //save email to database
  try {
    await db.subscriber.create({
      data: {
        email: email,
      },
    });

    revalidatePath("/");

    return { message: "Thank you for Subscribing!" };
  } catch (error) {
    //console.log("Error: ", error);

    if (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            message: "Email already Exist in the DB",
          };

          //   toast({
          //     variant: "destructive",
          //     description: "Email already Exist in the DB",
          //   });
        }
      }
    }

    return { message: "Database Error: Failed to create Subscriber." };
  }
}
