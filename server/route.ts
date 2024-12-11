import { Express } from 'express'
import patientV1 from './api/v1/controllers/patient/route'
import healthTestV1 from './api/v1/controllers/healthTest/route'

function routes(app: Express) {
    app.use('/api/v1/patients', patientV1)
    app.use('/api/v1/health-tests', healthTestV1)
}

export default routes;