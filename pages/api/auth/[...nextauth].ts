import NextAuth from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import { FirestoreAdapter } from '@next-auth/firebase-adapter';

import { firestore } from '@/lib/firestore';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.uid = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: FirestoreAdapter(firestore),
});
