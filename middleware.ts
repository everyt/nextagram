import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

const secret = process.env.NEXTAUTH_SECRET;
export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async authorized({ req }) {
      const token = await getToken({ req, secret, raw: true });
      return !!token;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export const config = { matcher: ['/', '/reels', '/profile', '/messages', '/explore'] };
