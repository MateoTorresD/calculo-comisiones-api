# comisiones-api

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?logo=neon&logoColor=black)
![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black)

API de **Gestión de Comisiones**: dado un rango de fechas, calcula por vendedor el total vendido, el porcentaje de comisión que le corresponde y la comisión.

`GET /commissions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

## Reglas de comisión

Se evalúa el **total vendido por el vendedor en el rango** y se aplica la regla de mayor `min_amount` que ese total alcance (`>=`):

| Total en el rango | Comisión |
| ----------------- | -------- |
| ≥ 1000            | 15 %     |
| ≥ 800             | 10 %     |
| ≥ 600             | 8 %      |
| ≥ 500             | 6 %      |
| < 500             | 0 %      |

## Variables de entorno

| Variable       | Descripción                                                         | Ejemplo                                |
| -------------- | ------------------------------------------------------------------- | -------------------------------------- |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL                                     | `postgresql://user:pass@host:5432/db`  |
| `DB_SSL`       | `true`, `no-verify` o `false` (por defecto). Neon requiere `true`   | `true`                                 |
| `FRONTEND_URL` | Origen(es) permitidos por CORS, separados por coma, sin slash final | `https://comisiones-web.vercel.app`    |
| `PORT`         | Puerto del servidor (por defecto `3000`)                            | `3000`                                 |

## Ejecutar

```bash
cp .env.template .env
npm install
npm run seed        # crea las tablas y carga los datos de ejemplo
npm run start:dev   # http://localhost:3000
```


## Deployed on:

https://calculo-comisiones-api.onrender.com/
