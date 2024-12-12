import { Express } from 'express'
import patientV1 from './api/v1/controllers/patient/route'
import healthTestV1 from './api/v1/controllers/healthTest/route'
import appointmentV1 from './api/v1/controllers/appointment/route'
import consultationV1 from './api/v1/controllers/consult/route'
import ituraV1 from './api/v1/controllers/itura/routes'
import medicalRecordV1 from './api/v1/controllers/medicalRecord/routes'

function routes(app: Express) {
    app.use('/api/v1/patients', patientV1)
    app.use('/api/v1/health-tests', healthTestV1)
    app.use('/api/v1/appointments', appointmentV1)
    app.use('/api/v1/consultations', consultationV1)
    app.use('/api/v1/itura', ituraV1)
    app.use('/api/v1/medical-records', medicalRecordV1)
}

export default routes;