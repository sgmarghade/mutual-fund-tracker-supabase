# Mutual Fund Tracker

A web application to track and manage your mutual fund investments. Built with React, TypeScript, and Supabase.

## Features

- Track multiple mutual funds in your portfolio
- Real-time NAV updates using MFAPI.in
- View current NAV, peak NAV, and buying NAV for each fund
- Calculate and display performance metrics:
  - Down from peak percentage
  - Returns from average buying NAV
- Two view options:
  - Card view for detailed fund information
  - List view for quick overview
- Edit buying details (average buying NAV, total units, last buying NAV)
- Responsive design with Tailwind CSS

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
- Backend:
  - Supabase (PostgreSQL)
- API:
  - MFAPI.in for mutual fund data

## Local Setup

1. Clone the repository:

bash
git clone <repository-url>
cd mutual-fund-tracker

2. Install dependencies:

bash
npm install

3. Create a Supabase project:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

4. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run database migrations:
```bash
supabase db push
```

6. Start the development server:
```bash
npm run dev
```

## Database Schema

The application uses the following main table:

```sql
table mutual_funds {
  id: string (primary key)
  scheme_code: string
  scheme_name: string
  current_nav: number
  peak_nav: number
  last_buying_nav: number | null
  avg_buying_nav: number | null
  total_units: number | null
  last_updated: string
  user_id: string (foreign key to auth.users)
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [MFAPI.in](https://www.mfapi.in/) for providing mutual fund data
- [Supabase](https://supabase.com) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) for styling

