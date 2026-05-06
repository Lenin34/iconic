# Docker - Iconic

## Estructura

```
iconic/
├── frontend/          # Next.js 16 + React 19 + Tailwind v4 + Framer Motion
├── backend/           # Laravel API
├── nginx/             # Nginx config para Laravel
└── docker-compose.yml # Orquestación
```

## Servicios

- **frontend**: http://localhost:3000 (Next.js)
- **backend**: http://localhost:8000 (Laravel API vía Nginx)
- **mysql**: localhost:3306

## Ejecutar

```bash
# Iniciar todos los servicios
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

## Variables de entorno

### Frontend
- `NEXT_PUBLIC_API_URL`: URL del backend
- `NEXT_PUBLIC_SITE_URL`: URL del frontend

### Backend
- `DB_HOST`: mysql
- `DB_DATABASE`: iconic
- `DB_USERNAME`: iconic
- `DB_PASSWORD`: iconic

## Notas

- El backend requiere Laravel instalado primero (no está scaffolded aún)
- Para desarrollo local sin Docker, usa `npm run dev` en frontend/
