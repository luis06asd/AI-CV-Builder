import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 50 },
    { duration: '30s', target: 50 },

    { duration: '20s', target: 100 },
    { duration: '30s', target: 100 },

    { duration: '20s', target: 150 },
    { duration: '30s', target: 150 },

    { duration: '20s', target: 300 },
    { duration: '30s', target: 300 },

    { duration: '20s', target: 500 },
    { duration: '30s', target: 500 },

    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
    checks: ['rate>0.95'],
  },
};

const FRONTEND = 'http://localhost:5173';
const BACKEND = 'http://localhost:3001';

export default function () {
  // 1. Visita la página de inicio
  const home = http.get(`${FRONTEND}/`);
  check(home, {
    'inicio HTTP 200': (r) => r.status === 200,
  });

  sleep(1);

  // 2. Visita la página del editor de CV
  const builder = http.get(`${FRONTEND}/builder`);
  check(builder, {
    'editor HTTP 200': (r) => r.status === 200,
  });

  sleep(1);

  // 3. Verifica el estado de salud de la API
  const health = http.get(`${BACKEND}/api/health`);
  check(health, {
    'API HTTP 200': (r) => r.status === 200,
    'API saludable': (r) => {
      try {
        return r.json('status') === 'ok';
      } catch (_) {
        return false;
      }
    },
  });

  // 4. Simula al usuario guardando su CV en la base de datos
  const randomId = Math.floor(Math.random() * 100000);
  const payload = JSON.stringify({
    title: 'Desarrollador Full Stack',
    full_name: `Usuario k6_${randomId}`,
    job_title: 'Ingeniero de Software',
    password: 'PasswordSeguro123!',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const saveCvRes = http.post(`${BACKEND}/api/cvs`, payload, params);

  check(saveCvRes, {
    'guardar CV exitoso (201 o 200)': (r) => r.status === 200 || r.status === 201,
    'devuelve access_code': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.access_code !== undefined;
      } catch (_) {
        return false;
      }
    },
  });

  sleep(Math.random() * 2 + 1);
}