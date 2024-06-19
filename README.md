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

## Setup Frontend (Next.js)

### 1. Install Dependencies

```bash
cd frontend
yarn install
```

### 2. Konfigurasi Environment

Buat file `.env.local` di root direktori frontend dan tambahkan konfigurasi yang diperlukan. Contoh konfigurasi:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:1337
```
atau bisa copy `.env.local.example` dengan cara

```bash
cp .env.local.example .env.local
```

### 3. Jalankan Server Development

```bash
yarn dev
```

## Setup Backend (Strapi)

### 1. Install Dependencies

```bash
cd backend
yarn install
```

### 2. setup environtment

```bash
cp .env.example .env
```

### 3. buat folder uploads

pastikan directory saat ini sudah berada `/backend` :

```bash
mkdir /backend/public/uploads
```

### 4. Jalankan Server Development

```bash
yarn develop
```

### 5. Buka Dashboard Admin Strapi

Setelah server Strapi berjalan, buka `http://localhost:1337/admin` di browser. Ikuti langkah-langkah setup awal untuk membuat akun admin dan konfigurasi awal lainnya.

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
