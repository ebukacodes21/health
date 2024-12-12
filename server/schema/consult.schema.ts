import * as z from 'zod'

export const createConsultationSchema = z.object({
    body: z.object({
      patientId: z.number({
        required_error: "Patient ID is required",
      }).int(),
      type: z.string({
        required_error: "consultation type is required",
      }),
      appointmentDateTime: z.string({
        required_error: "Appointment date and time are required",
      }),
      reason: z.string({
        required_error: "reason for appointment required",
      }),
    }),
  });

  export const updateConsultationSchema = z.object({
    query: z.object({
        id: z.string().regex(/^\d+$/, "consultation ID must be a number").transform(Number),
    }),
    body: z.object({
        patientId: z.number({
            required_error: "Patient ID is required",
          }).int(),
        status: z.enum(["pending", "rejected","confirmed" , "completed"], {
            required_error: "Appointment status is required",
          }),
    }),
  });

  export type CreateConsultationInput = z.TypeOf<typeof createConsultationSchema>["body"];
  export type UpdateConsultationInput = z.TypeOf<typeof updateConsultationSchema>;