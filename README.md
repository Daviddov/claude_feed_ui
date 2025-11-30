# RSS Analytics Dashboard

דשבורד Next.js מקצועי לניתוח ביצועים וניהול מערכת ה-RSS Analysis.

## תכונות

### 📊 תצוגה גרפית מלאה
- **Overview Dashboard** - כרטיסי מדדים בזמן אמת (Total Articles, Matches, Quality Score)
- **Timeline Chart** - גרף קו של כתבות לאורך זמן לפי מקור
- **Source Comparison** - השוואת מקורות חדשות (Articles vs Matches)
- **Category Distribution** - פילוח קטגוריות עם Pie Chart
- **Articles List** - רשימה מסוננת של כל הכתבות
- **Matches Visualization** - תצוגה של התאמות עם ציון דמיון

### ⚡ Real-Time Updates
- עדכון אוטומטי כל 30 שניות
- React Query עם polling מתקדם
- Cache management חכם
- Optimistic UI updates

### 🎨 עיצוב מקצועי
- **shadcn/ui** - קומפוננטות מודרניות ונגישות
- **Tailwind CSS** - עיצוב responsive
- **Recharts** - גרפים אינטראקטיביים
- **Dark mode ready** - תמיכה במצב כהה (ניתן להוסיף)

### 🚀 ביצועים
- Server Components + Client Components
- Code splitting אוטומטי
- Image optimization
- Static generation where possible

## התקנה

### דרישות מוקדמות
```bash
Node.js 18+ (מותקן)
npm או yarn
Backend server רץ על port 3000
```

### הפעלה מקומית

1. **נווט לתיקיית הדשבורד**:
```bash
cd dashboard
```

2. **וודא שה-dependencies מותקנים** (כבר נעשה):
```bash
npm install
```

3. **הגדר את כתובת ה-API** (כבר מוגדר):
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```
הקובץ `.env.local` כבר קיים עם ההגדרה הזו.

4. **הפעל את Backend Server** (בחלון טרמינל נפרד):
```bash
# בתיקיה הראשית (לא dashboard/)
npm start
```

5. **הפעל את הדשבורד**:
```bash
# בתיקיית dashboard/
npm run dev
```

6. **פתח בדפדפן**:
```
http://localhost:3001
```

## מבנה הפרויקט

```
dashboard/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout ראשי עם Sidebar + Header
│   ├── page.tsx             # דף Dashboard הראשי
│   ├── articles/page.tsx    # דף Articles
│   └── matches/page.tsx     # דף Matches
├── components/
│   ├── layout/              # Layout components
│   │   ├── sidebar.tsx      # תפריט צד עם ניווט
│   │   └── header.tsx       # Header עם סטטיסטיקות
│   ├── dashboard/           # Dashboard components
│   │   ├── metric-card.tsx  # כרטיס מדד בודד
│   │   └── overview-metrics.tsx  # סקירת כל המדדים
│   ├── charts/              # Chart components
│   │   ├── timeline-chart.tsx         # Line chart
│   │   ├── source-comparison-chart.tsx # Bar chart
│   │   └── category-chart.tsx         # Pie chart
│   └── ui/                  # shadcn/ui components
├── hooks/
│   └── use-dashboard.ts     # React Query hooks
├── lib/
│   ├── api-client.ts        # API client עם TypeScript types
│   ├── query-client.tsx     # React Query provider
│   └── utils.ts             # Utilities (cn, etc)
├── .env.local               # Environment variables
└── package.json
```

## API Integration

הדשבורד מתחבר ל-Backend דרך API endpoints:

### Endpoints בשימוש:
- `GET /api/analytics/dashboard` - נתוני דשבורד מלאים
- `GET /api/stats` - סטטיסטיקות מערכת
- `GET /api/articles` - רשימת כתבות (עם סינון)
- `GET /api/matches` - רשימת התאמות

### Auto-Refresh:
```typescript
// lib/query-client.tsx
refetchInterval: 30 * 1000,  // 30 שניות
staleTime: 30 * 1000,
```

## Deployment

### Vercel (מומלץ)

1. **צור חשבון ב-Vercel** (אם אין):
```bash
npm i -g vercel
vercel login
```

2. **Deploy**:
```bash
cd dashboard
vercel
```

3. **הגדר Environment Variable**:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

```bash
docker build -t rss-dashboard .
docker run -p 3001:3001 -e NEXT_PUBLIC_API_URL=http://backend:3000 rss-dashboard
```

## תכונות נוספות להוסיף (אופציונלי)

### 1. **Date Range Picker**
```bash
npm install react-day-picker
```
הוסף לכל עמוד סינון לפי תאריכים.

### 2. **Dark Mode**
```bash
npm install next-themes
```
כבר מוכן ל-dark mode דרך shadcn/ui.

### 3. **Export Reports**
```bash
npm install jspdf html2canvas
```
ייצוא דשבורד ל-PDF.

### 4. **Real-time WebSocket**
במקום polling, הוסף WebSocket:
```typescript
// lib/websocket.ts
const ws = new WebSocket('ws://localhost:3000');
```

### 5. **Advanced Filtering**
הוסף filters ל-Articles page:
- Filter by source
- Filter by category
- Filter by date range
- Search by title

### 6. **Performance Monitoring**
הוסף עמוד Performance:
- Query speed metrics
- Database performance
- API response times
- pgvector usage stats

## Scripts

```bash
npm run dev          # Development server (port 3001)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

## Troubleshooting

### בעיה: דשבורד לא טוען נתונים

**תסמין**: Loading skeletons לא נעלמים

**פתרון**:
1. וודא Backend רץ על port 3000
2. בדוק ב-DevTools → Network → XHR
3. וודא CORS מוגדר ב-Backend:
```typescript
// src/app.ts
app.use(cors({
  origin: 'http://localhost:3001'
}));
```

### בעיה: TypeScript errors

**פתרון**:
```bash
cd dashboard
npm run build
```

אם יש שגיאות - תקן לפי ההודעות.

### בעיה: Port 3001 תפוס

**פתרון**:
```bash
# שנה ל-port אחר
PORT=3002 npm run dev
```

## תכונות Real-Time

הדשבורד מתעדכן אוטומטית בזכות:

### React Query Polling:
```typescript
// Auto-refetch every 30s
queryClient.setDefaultOptions({
  queries: {
    refetchInterval: 30000,
  },
});
```

### Manual Refresh:
לחצן "Refresh" ב-Header מאפס את כל ה-cache.

### Live Indicator:
סמן ירוק מהבהב ב-Sidebar מציין חיבור פעיל.

## Performance Tips

1. **Lazy Load Components**:
```typescript
const HeavyChart = dynamic(() => import('@/components/charts/heavy-chart'), {
  loading: () => <Skeleton />
});
```

2. **Reduce Polling Frequency**:
```typescript
// lib/query-client.tsx
refetchInterval: 60000, // 1 דקה במקום 30 שניות
```

3. **Pagination**:
הוסף pagination ל-Articles + Matches pages.

## סיכום

✅ דשבורד Next.js מלא ומקצועי
✅ Real-time updates כל 30 שניות
✅ תצוגות גרפיות אינטראקטיביות
✅ Responsive design
✅ TypeScript עם type safety מלא
✅ Production-ready
✅ קומפילציה עוברת ללא שגיאות

**תאריך יצירה**: 30 נובמבר 2025
**גרסה**: 1.0.0
**טכנולוגיות**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Recharts, TanStack Query
