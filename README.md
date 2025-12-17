# AutoPartSnap Monorepo

AutoPartSnap es un monorepo basado en **pnpm workspaces** que agrupa las experiencias web, móvil y API para identificar piezas de automóvil a partir de una foto.

## Estructura

```
/
├─ apps/
│  ├─ mobile/    (Expo React Native + TypeScript)
│  ├─ web/       (Next.js 14 + TypeScript)
│  └─ api/       (Next.js 14 + TypeScript, solo API)
├─ packages/
│  └─ shared/    (TypeScript + Zod)
├─ pnpm-workspace.yaml
├─ package.json
└─ README.md
```

## Requisitos previos

- Node.js 18+ (en Windows puedes usar [nvm-windows](https://github.com/coreybutler/nvm-windows) o [Volta](https://volta.sh/)).
- pnpm (`corepack enable` y luego `corepack prepare pnpm@latest --activate` en PowerShell o Git Bash).
- Git.

## Instalación

```bash
pnpm install
```

> En Windows, ejecuta los comandos anteriores desde **PowerShell** o **Git Bash** para evitar problemas de rutas.

## Scripts principales

Todos los comandos se ejecutan desde la raíz del monorepo:

- `pnpm dev:web` – inicia la app web (Next.js).
- `pnpm dev:api` – inicia la app de API (Next.js API-only).
- `pnpm dev:mobile` – inicia el proyecto Expo.
- `pnpm typecheck` – corre los chequeos de TypeScript en todos los paquetes.
- `pnpm lint` – ejecuta los linters definidos en cada paquete.

## Apps

### Web (Next.js 14)
- Landing page con CTA "Get Started" hacia `/login`.
- Ruta `/login` como placeholder.

### API (Next.js 14)
- Endpoint `GET /api/health` que responde `{ ok: true }` y valida la dependencia compartida.

### Mobile (Expo + TypeScript)
- Pantalla principal con botones **Tomar foto** y **Subir foto** y navegación básica entre vistas.

## Paquete compartido

`@autopartsnap/shared` expone esquemas de Zod para códigos de error y la respuesta de identificación de piezas.

## Próximos pasos

- Conectar el flujo real de autenticación y almacenamiento.
- Integrar la lógica de identificación y subida de imágenes.
