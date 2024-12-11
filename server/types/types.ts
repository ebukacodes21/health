export type PatientType = {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  phone: string;
  role?: "patient" | "admin";
};

export type UpdateRequest = {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  patient: PatientType;
  accessToken: string;
  refreshToken: string;
};

export type HealthTestType = {
  id?: number;
  type: string;
  description: string;
  code?: string;
  facility: string;
};

export type AppointmentType = {
  id?: number;
  patientId: number;
  testId: number;
  appointmentDateTime: string;
  doctorName: string;
  status: "booked" | "completed" | "cancelled";
};

export type AppointmentRequest = {
  id?: number;
  patientId: number;
  testId: number;
  appointmentDateTime: string;
  doctorName: string;
};

export type UpdateAppointmentType = {
  id?: number;
  patientId: number;
  testId: number;
  status: "booked" | "completed" | "cancelled";
};

export type ConsultRequest = {
  id: number;
  patientId: number;
  consultationType: string;
  appointmentDateTime: string;
  reason: string;
};
