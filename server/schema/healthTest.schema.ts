import * as z from 'zod'

export const createHealthTestSchema = z.object({
    body: z.object({
     type: z.string({
        required_error: "test type is required"
     }),
     description: z.string({
        required_error: "test description is required"
     }),
     facility: z.string({
        required_error: "test facility is required"
     }),
    })
})

 export type CreateHealthTestInput = z.TypeOf<typeof createHealthTestSchema>["body"]