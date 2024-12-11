import * as z from 'zod'

export const createAppointmentSchema = z.object({
    body: z.object({
      patientId: z.number({
        required_error: "Patient ID is required",
      }).int(),
      testId: z.number({
        required_error: "Test ID is required",
      }).int(),
      appointmentDateTime: z.string({
        required_error: "Appointment date and time are required",
      }),
      doctorName: z.string({
        required_error: "Doctor name is required",
      }).min(1, { message: "Doctor name cannot be empty" }),
    }),
  });

  export const updateAppointmentSchema = z.object({
    query: z.object({
        id: z.string().regex(/^\d+$/, "appointment ID must be a number").transform(Number),
    }),
    body: z.object({
        patientId: z.number({
            required_error: "Patient ID is required",
          }).int(),
          testId: z.number({
            required_error: "Test ID is required",
          }).int(),
        status: z.enum(['booked', 'completed', 'cancelled'], {
            required_error: "Appointment status is required",
          }),
    }),
  });

 export type CreateAppointmentInput = z.TypeOf<typeof createAppointmentSchema>["body"];
 export type UpdateAppointmentInput = z.TypeOf<typeof updateAppointmentSchema>;