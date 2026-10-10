এইখানে বেশির ভাগই জেমেনি থেকে লিখে নিয়েছি, এসাইনমেন্টের প্রেশারে মাথায় আর কাজ করছে না টু রাইট দ্য রিডমি........

<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর — বাজারভিত্তিক বিস্তারিত তথ্যসহ।

</div>

---

## 📖 About

BazarDor is a Bangla market price website made for Programming Hero assignment **B14-A7**.
It shows today's price of daily products, how much the price went up or down, and the price of each product in different bazars of Bangladesh.
All the data comes from the BazarDor REST API.

## 🛠️ Technologies Used

| Technology             | Why                                         |
| ---------------------- | ------------------------------------------- |
| Next.js (App Router)   | pages, routing and server side data loading |
| TypeScript             | safer code                                  |
| Tailwind CSS + DaisyUI | styling and responsive design               |
| Better Auth            | email/password, Google and GitHub login     |
| PostgreSQL             | stores the users for Better Auth            |
| React Hot Toast        | toast messages                              |
| Lucide React           | icons                                       |

## ✨ Features

1. **Price ticker** – an infinite moving strip under the navbar with emoji, name, price and ▲/▼ change
2. **Top risers and fallers** – top 6 products whose price went up and down today
3. **All products grid** – responsive cards with Bangla digits and green / red / gray change badge
4. **Category pages** – skeleton loading, and sorting (default, low to high, high to low) by real number
5. **Protected product details** – only logged in users can see min, max, average and market wise prices (with division filter and search)
6. **Authentication** – sign up, sign in, Google and GitHub login using Better Auth
7. **Profile and update name** – view profile and change your name
8. **Friendly 404 page** and fully responsive design for mobile, tablet and desktop

## 🚀 Run Locally

```bash
npm install
cp .env.example .env.local     # on Windows: copy .env.example .env.local
# fill the values inside .env.local
npm run migrate                # creates the auth tables in your database
npm run dev
```

Open http://localhost:3000

### Environment variables

| Name                                       | What to put                                                  |
| ------------------------------------------ | ------------------------------------------------------------ |
| `BETTER_AUTH_SECRET`                       | any random text, 32 or more characters                       |
| `BETTER_AUTH_URL`                          | `http://localhost:3000` (use your Vercel link in production) |
| `DATABASE_URL`                             | PostgreSQL connection string (Neon / Supabase)               |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | from Google Cloud Console                                    |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | from GitHub → Settings → Developer settings → OAuth Apps     |

### OAuth callback URLs

| Provider | Local                                            | Production                                     |
| -------- | ------------------------------------------------ | ---------------------------------------------- |
| Google   | `http://localhost:3000/api/auth/callback/google` | `https://YOUR-DOMAIN/api/auth/callback/google` |
| GitHub   | `http://localhost:3000/api/auth/callback/github` | `https://YOUR-DOMAIN/api/auth/callback/github` |

## 🔗 API

Base URL: `https://api.abcz.workers.dev/api/bazardor`

- `/products`, `/products?category=chal`, `/products/1`
- `/categories`, `/categories/chal`

## 📦 Deploy

Deployed on Vercel. Add all the environment variables in **Project Settings → Environment Variables** and set `BETTER_AUTH_URL` to the live link.

- Live link: https://assignment-07-sandy.vercel.app/
- GitHub repository: https://github.com/meefthah-art/assignment-07.git
