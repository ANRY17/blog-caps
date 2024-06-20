# Setup Proyek Next.js dan Strapi dengan Sqlite

Proyek ini berisi instruksi untuk menyiapkan proyek Next.js (frontend) dan Strapi (backend) dengan menggunakan database Sqlite.

## Setup Proyek Blog-Caps

### 1. Clone Repositori

```bash
git clone https://github.com/AZURA17/blog-caps.git
```

### 2. Masuk ke Direktori Proyek

```bash
cd blog-caps
```

### 4. Pastikan di Komputer Anda Sudah Terinstall Node.js

```bash
node -v
```

### 4. Instalasi Yarn

```bash
npm install --global yarn
```


## Setup Backend (Strapi)

### 1. Masuk ke Direktori Backend

```bash
cd blog-caps/backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Setup Environtment

```bash
cp .env.example .env
```

### 4. Buat Folder Uploads

pastikan directory saat ini sudah berada `/backend` :

```bash
mkdir /backend/public/uploads
```

### 5. Sesuaikan next.config.mjs Sesuai Kebutuhan

Secara Default Configurasi Strapi Pada Next.Js Seperti Ini : 

```bash
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```

### 5. Jalankan Server Development

```bash
yarn develop
```

### 6. Buka Dashboard Admin Strapi

Setelah server Strapi berjalan, buka `http://localhost:1337/admin` di browser. Ikuti langkah-langkah setup awal untuk membuat akun admin dan konfigurasi awal lainnya.


## Setup Frontend (Next.js)

### 1. Masuk ke Direktori frontend

```bash
cd blog-caps/fronted
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Konfigurasi Environment

Buat file `.env.local` di root direktori frontend dan tambahkan konfigurasi yang diperlukan. Contoh konfigurasi:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:1337
```

### 4. Jalankan Server Development

```bash
yarn dev
```

## Deployment

### 1. Link Frontend

[Next.js](https://jejakwisata.site)

### 2. Link Backend

[Strapi](https://develop.jejakwisata.site)

### 3. Public Email and Password Strapi

**Email:** public@gmail.com

**Password:** Public1234

> **Catatan:** ini merupakah akun dengan roles author bukan editor maupun super admin

## Kontribusi

Jika kamu menemukan masalah atau ingin berkontribusi, silakan buka *issues* atau *pull requests* di repositori ini.
