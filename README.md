# 💊 Farmacia POS

Sistema de punto de venta de escritorio para farmacias en Perú, construido con Electron, React y TypeScript. Diseñado para operar en modo offline con sincronización automática a Firebase Firestore.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)
![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)

---

## Tabla de contenidos

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración inicial](#configuración-inicial)
- [Módulos](#módulos)
- [Hardware compatible](#hardware-compatible)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts disponibles](#scripts-disponibles)
- [Variables de entorno](#variables-de-entorno)
- [Deploy y releases](#deploy-y-releases)
- [Roles y permisos](#roles-y-permisos)

---

## Características

- **Modo offline crítico** — opera sin internet, sincroniza automáticamente al recuperar conexión
- **Lector de código de barras** — búsqueda instantánea de productos por escaneo USB
- **Ticketera térmica** — impresión ESC/POS en formato 80mm via USB
- **Caja registradora** — apertura automática del cajón al confirmar ventas en efectivo
- **Comprobantes electrónicos** — integración con SUNAT via apisunat.pe (boletas y facturas)
- **Consulta RENIEC/SUNAT** — autocompletado de datos de clientes y proveedores por DNI/RUC
- **Control FEFO** — descuento de inventario por fecha de vencimiento (First Expired, First Out)
- **Dashboard en tiempo real** — métricas del día, alertas de stock y vencimientos
- **Actualización automática** — auto-update via GitHub Releases
- **Modo kiosko** — pantalla completa sin bordes para equipos dedicados

---

## Stack tecnológico

| Capa          | Tecnología                               |
| ------------- | ---------------------------------------- |
| Desktop       | Electron 39                              |
| UI            | React 19 + TypeScript 5.9                |
| Estilos       | Tailwind CSS 3 + shadcn/ui               |
| Estado global | Zustand 5                                |
| Base de datos | Firebase Firestore (offline persistence) |
| Autenticación | Firebase Auth                            |
| Formularios   | React Hook Form + Zod                    |
| Hardware      | @node-escpos (ESC/POS)                   |
| Comprobantes  | apisunat.pe                              |
| Exportación   | xlsx                                     |
| i18n          | i18next                                  |
| Build         | Vite + electron-vite                     |
| CI/CD         | GitHub Actions                           |

---

## Requisitos

- **Node.js** >= 20
- **npm** >= 9
- **Sistema operativo**: Windows 10/11 (producción), macOS, Linux
- **Firebase**: proyecto con Firestore y Authentication habilitados
- **Hardware opcional**: ticketera térmica USB 80mm compatible ESC/POS, caja registradora con puerto RJ11

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/karlofsd/pharmapos.git
cd pharmapos

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

---

## Configuración inicial

Al instalar la aplicación por primera vez aparecerá una pantalla de configuración donde debes ingresar las credenciales de Firebase de tu proyecto. Estas se guardan localmente de forma segura.

Para obtener las credenciales ve a **Firebase Console → Configuración del proyecto → Tus apps → SDK de Firebase**.

Los campos requeridos son:

```
API Key
Auth Domain
Project ID
Storage Bucket
Messaging Sender ID
App ID
```

### Seeds de datos iniciales

Antes de usar el sistema por primera vez ejecuta los scripts de carga inicial:

```bash
# Cargar catálogos (laboratorios, categorías, unidades)
npm run seed:catalogs

# Cargar DCI base (principios activos)
npm run seed:dci
```

### Crear el primer usuario administrador

Ve a **Firebase Console → Authentication → Users** y crea un usuario con email y contraseña. Luego en Firestore crea el documento correspondiente en la colección `users`:

```json
{
	"name": "Admin",
	"lastname": "Farmacia",
	"role": "admin",
	"level": 3,
	"isActive": true,
	"document": { "dni": "00000000" },
	"phoneNumber": { "code": "+51", "number": "999999999" },
	"email": "admin@farmacia.com",
	"createdAt": "<timestamp>"
}
```

### Configuración SUNAT (opcional)

Para emitir comprobantes electrónicos crea los documentos en Firestore:

**`settings/businessConfig`**

```json
{
	"ruc": "20000000001",
	"socialReason": "MI FARMACIA S.A.C.",
	"name": "Farmacia Central",
	"address": "Av. Principal 123",
	"department": "Lima",
	"province": "Lima",
	"district": "Miraflores",
	"phoneNumber": "01-000-0000"
}
```

**`settings/receiptConfig`**

```json
{
	"apisunatToken": "tu-token-apisunat",
	"apisunatUrl": "https://api.apisunat.com/v1",
	"boletaSerie": "B001",
	"facturaSerie": "F001",
	"igv": "18",
	"igvCode": "10"
}
```

---

## Módulos

### POS — Punto de venta

Pantalla principal de cobro con búsqueda de productos por nombre o código de barras, carrito de compras, selección de método de pago (efectivo, tarjeta, crédito, saldo a favor, mixto) y emisión de comprobante. Requiere caja abierta para operar.

### Inventario

Vista de lotes con stock actual, precios, fechas de vencimiento y estados (Ok, Stock bajo, Agotado, Por vencer, Vencido). Permite agregar lotes, ajustar stock manualmente y editar precios de venta.

### Productos

Catálogo maestro de productos con soporte para DCI (principios activos), múltiples códigos de barras, categorías dinámicas y laboratorios. Al crear un producto ofrece agregar un lote directamente.

### Ventas

Historial completo de ventas con filtros por fecha, cajero y estado. Permite anular ventas con reversión automática de stock.

### Movimientos

Registro de todos los movimientos de inventario (entradas, ventas, ajustes, devoluciones, reversiones) con filtros y exportación a Excel.

### Caja

Gestión de turnos de caja con apertura, retiros e ingresos manuales, cierre con corte de diferencia y exportación de reporte.

### Créditos

Gestión de deudas y saldos a favor de clientes. Permite registrar abonos en efectivo o aplicando saldo a favor.

### Clientes

Directorio de clientes con consulta automática a RENIEC por DNI. Muestra historial de compras y estado crediticio.

### Proveedores

Directorio de proveedores con consulta automática a SUNAT por RUC.

### Pedidos

Gestión de órdenes de compra a proveedores. Al recibir un pedido crea automáticamente los lotes y movimientos de entrada en el inventario.

### Documentos

Listado de boletas y facturas electrónicas con actualización de estado SUNAT y previsualización del PDF.

### Reportes

9 reportes exportables a Excel: ventas por período, por método de pago, por cajero, kárdex, inventario actual, productos por vencer, stock bajo mínimo, rentabilidad y créditos pendientes.

### Configuración

- **Tema**: claro/oscuro y color primario
- **Idioma**: español/inglés
- **Accesibilidad**: tamaño de texto normal/grande
- **Catálogos**: laboratorios, categorías y unidades
- **Hardware**: activar/desactivar ticketera y apertura de caja
- **Usuarios**: crear y gestionar cuentas con roles y niveles
- **Permisos**: tabla de permisos por rol

---

## Hardware compatible

### Ticketera térmica

Cualquier impresora térmica USB compatible con protocolo **ESC/POS** y papel de **80mm**.

Para activarla ve a **Configuración → Hardware → Emitir ticket de venta**.

### Caja registradora

Cualquier cajón porta billetes con conexión RJ11 a la ticketera o con puerto serial independiente.

Para activarla ve a **Configuración → Hardware → Abrir caja registradora**.

---

## Estructura del proyecto

```
pharmapos/
├── src/
│   ├── main/                    # Proceso principal Electron
│   │   ├── index.ts
│   │   └── services/
│   │       ├── printer.ts       # ESC/POS y apertura de cajón
│   │       ├── updater.ts       # Auto-update
│   │       └── document.ts      # Consulta RENIEC/SUNAT (proxy CORS)
│   ├── preload/                 # Puente IPC seguro
│   └── renderer/
│       └── src/
│           ├── pages/           # Módulos de la aplicación
│           ├── components/      # Componentes reutilizables
│           ├── hooks/           # Lógica de negocio
│           ├── services/        # Acceso a Firebase y APIs
│           ├── store/           # Estado global (Zustand)
│           ├── types/           # Tipos TypeScript
│           ├── i18n/            # Traducciones
│           └── utils/           # Utilidades
├── shared/                      # Código compartido Main/Renderer
│   ├── ipcChannels.ts
│   └── types/
├── scripts/                     # Seeds de datos iniciales
├── resources/                   # Íconos de la aplicación
└── .github/
    └── workflows/
        └── release.yml          # CI/CD GitHub Actions
```

---

## Scripts disponibles

```bash
# Desarrollo
npm run dev              # Iniciar en modo desarrollo

# Compilación
npm run build            # Compilar para producción
npm run build:win        # Instalador Windows (.exe)
npm run build:mac        # Instalador macOS (.dmg)
npm run build:linux      # Instalador Linux (.AppImage, .deb)

# Calidad de código
npm run lint             # Verificar con ESLint
npm run format           # Formatear con Prettier
npm run typecheck        # Verificar tipos TypeScript

# Seeds
npm run seed:catalogs    # Cargar catálogos iniciales
npm run seed:dci         # Cargar principios activos base
npm run seed:products    # Cargar productos de ejemplo
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz con las credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_DECOLECTA_API_KEY=
```

> **Nota**: En producción estas variables no son necesarias — cada instalación se configura desde la pantalla de setup inicial.

---

## Deploy y releases

El CI/CD está configurado con GitHub Actions. Para publicar una nueva versión:

```bash
# Incrementar versión (patch = 1.0.0 → 1.0.1)
npm version patch

# Push con el tag para disparar el workflow
git push origin main --tags
```

GitHub Actions compila automáticamente para Windows, macOS y Linux y publica los instaladores en GitHub Releases. Los clientes con la app instalada reciben la notificación de actualización automáticamente.

---

## Roles y permisos

| Módulo                    | Admin | Supervisor | Cajero       |
| ------------------------- | ----- | ---------- | ------------ |
| POS — Ventas              | ✓     | ✓          | ✓            |
| POS — Modificar precio    | ✓     | ✓          | ✗            |
| POS — Anular venta        | ✓     | ✓          | ✗            |
| Inventario — Ver          | ✓     | ✓          | Solo lectura |
| Inventario — Agregar lote | ✓     | ✓          | ✗            |
| Productos — Crear/Editar  | ✓     | ✗          | ✗            |
| Ventas — Ver historial    | ✓     | ✓          | Solo lectura |
| Caja — Abrir/Cerrar       | ✓     | ✓          | ✓            |
| Caja — Retiros e ingresos | ✓     | ✓          | ✗            |
| Créditos                  | ✓     | ✓          | ✗            |
| Clientes                  | ✓     | ✓          | ✗            |
| Proveedores               | ✓     | ✗          | ✗            |
| Pedidos                   | ✓     | ✓          | ✗            |
| Reportes                  | ✓     | ✓          | ✗            |
| Documentos SUNAT          | ✓     | ✗          | ✗            |
| Configuración             | ✓     | ✗          | ✗            |

---

## Licencia

MIT © 2026 ArkaN
