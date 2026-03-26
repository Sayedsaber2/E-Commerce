import {z} from "zod";

export const schema = z.object({
  name: z.string().nonempty("name is required").min(3, "3 letters"),
  email: z.string().nonempty("email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "invalied email"),
  password: z.string().nonempty("password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    "Password must be at least 8 characters with uppercase, lowercase, and number"),
  rePassword: z.string().nonempty("rePassword is required"),
  phone: z.string().nonempty("phone is required").regex(/^01[0125][0-9]{8}$/gm,"Enter an Egyptian number"),
}).refine((data) => data.rePassword == data.password, {
  path: ["rePassword"],
  message: "password and rePassword dont match",
})
export type SignUpFormValues = z.infer<typeof schema>;