import "next-auth";

declare module "next-auth" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
}

  interface Session {
    user: {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
      } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
  }
}
