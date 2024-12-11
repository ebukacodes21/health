import * as z from 'zod'

export const patientRegisterSchema = z.object({
    body: z.object({
        firstName: z.string({
            required_error: "first name is required"
        }),
        lastName: z.string({
            required_error: "last name is required"
        }),
        email: z.string({
            required_error: "email is required"
        }).email("must be a valid email address"),
        phone: z.string({
            required_error: "phone number is required"
        }).min(11, "must be atleast 11 digits"),
        age: z.number({
            required_error: "age is required"
        }),
        password: z.string({
            required_error: "password is required"
        }),
    })
});

export const patientUpdateSchema = z.object({
    query: z.object({
        id: z.string().regex(/^\d+$/, "patient id must be a number").transform(Number),
    }),
    body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email("must be a valid email address"),
        phone: z.string().min(11, "must be atleast 11 digits"),
        age: z.number(),
    })
})

export const patientLoginSchema = z.object({
   body: z.object({
    email: z.string({
        required_error: "email is required"
    }).email("must be a valid email address"),
    password: z.string({
        required_error: "password is required"
    }),
   })
})

export type PatientRegisterInput = z.TypeOf<typeof patientRegisterSchema>["body"]
export type PatientLoginInput = z.TypeOf<typeof patientLoginSchema>["body"]
export type PatientUpdateInput = z.TypeOf<typeof patientUpdateSchema>