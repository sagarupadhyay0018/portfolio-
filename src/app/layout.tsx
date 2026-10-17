import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Sagar Upadhyay — Developer Portfolio',
  description: 'Frontend developer building thoughtful web experiences. Seeking a web development or software engineering internship.',
  openGraph: {
    title: 'Sagar Upadhyay — Developer Portfolio',
    description: 'Ideas into working websites. Explore projects, skills, and the journey so far.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
