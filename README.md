# Setup Proyek Next.js dan Strapi dengan MySQL

Proyek ini berisi instruksi untuk menyiapkan proyek Next.js (frontend) dan Strapi (backend) dengan menggunakan database MySQL.

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

### 2. Konfigurasi Database MySQL

1. Pastikan kamu memiliki server MySQL yang sudah berjalan.
2. Buatlah database baru dengan nama `strapi` di server MySQL.

### 3. Jalankan Server Strapi

```bash
yarn develop
```

### 4. Buka Dashboard Admin Strapi

Setelah server Strapi berjalan, buka `http://localhost:1337/admin` di browser. Ikuti langkah-langkah setup awal untuk membuat akun admin dan konfigurasi awal lainnya.

## Kontribusi

Jika kamu menemukan masalah atau ingin berkontribusi, silakan buka *issues* atau *pull requests* di repositori ini.
