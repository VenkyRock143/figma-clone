import './globals.css';

export const metadata = {
  title: 'Luxury Collection',
  description: 'Premium luxury products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}