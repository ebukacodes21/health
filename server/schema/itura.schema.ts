import * as z from 'zod';

export const ituraSchema = z.object({
    body: z.object({
        message: z.string({
            required_error: "message is required"
        })
    })
})

export type IturaInput = z.TypeOf<typeof ituraSchema>