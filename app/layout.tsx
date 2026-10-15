// app/layout.tsx
import StyledComponentsRegistry from '@/app/lib/registry';
import Nav from '@/app/components/Header/Nav';
import TabBar from '@/app/components/Header/TabBar';
import './globals.css';

export const metadata = {
  title: 'Zmanim Train Line',
  description: 'Chronological transit schedule for halachic times',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Nav />
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
        <TabBar />
      </body>
    </html>
  );
}