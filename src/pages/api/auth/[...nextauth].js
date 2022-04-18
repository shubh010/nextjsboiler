/* eslint-disable no-param-reassign */
// import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      id: 'admin-login',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        return null;
      },
    }),

    // CredentialProvider({
    //   name: 'credentials',
    //   id: 'vendor-login',
    //   credentials: {
    //     username: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'johndoe@test.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize: async (credentials, req) => {
    //     // console.log(credentials.username);

    //     await dbConnect();
    //     const vendor = await Vendor.findOne({
    //       email: credentials.username,
    //     }).catch((e) => console.log(e));
    //     // console.log(vendor);
    //     if (vendor) {
    //       const isValidated = await bcrypt.compare(
    //         credentials.password,
    //         vendor.password
    //       );
    //       if (isValidated) {
    //         return {
    //           id: vendor._id,
    //           name: vendor.name,
    //           email: vendor.email,
    //           type: 'vendor',
    //           profile_image: vendor.profile_image,
    //         };
    //       }
    //       return null;
    //     }
    //     return null;

    //     // if (
    //     //   credentials.username === "john" &&
    //     //   credentials.password === "test"
    //     // ) {
    //     //   return {
    //     //     id: 2,
    //     //     name: "John",
    //     //     email: "johndoe@test.com",
    //     //   };
    //     // }

    //     // login failed
    //     return null;
    //   },
    // }),

    // CredentialProvider({
    //   name: 'credentials',
    //   id: 'supervisor-login',
    //   credentials: {
    //     username: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'johndoe@test.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize: async (credentials, req) => {
    //     // console.log(credentials.username);

    //     await dbConnect();
    //     const supervisor = await SupervisorModel.findOne({
    //       email: credentials.username,
    //     }).catch((e) => console.log(e));
    //     // console.log(supervisor);
    //     if (supervisor) {
    //       const isValidated = await bcrypt.compare(
    //         credentials.password,
    //         supervisor.password
    //       );
    //       if (isValidated) {
    //         return {
    //           id: supervisor._id,
    //           name: supervisor.name,
    //           email: supervisor.email,
    //           type: 'supervisor',
    //           profile_image: supervisor.profile_image,
    //         };
    //       }
    //       return null;
    //     }
    //     return null;

    //     // if (
    //     //   credentials.username === "john" &&
    //     //   credentials.password === "test"
    //     // ) {
    //     //   return {
    //     //     id: 2,
    //     //     name: "John",
    //     //     email: "johndoe@test.com",
    //     //   };
    //     // }

    //     // login failed
    //     return null;
    //   },
    // }),

    // CredentialProvider({
    //   name: 'credentials',
    //   id: 'user-login',
    //   credentials: {
    //     username: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'johndoe@test.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize: async (credentials, req) => {
    //     // console.log(credentials);

    //     await dbConnect();
    //     const user = await User.findOne({
    //       email: credentials.username,
    //     }).catch((e) => console.log(e));
    //     // console.log(vendor);
    //     if (user) {
    //       const isValidated = await bcrypt.compare(
    //         credentials.password,
    //         user.password
    //       );
    //       if (isValidated) {
    //         return {
    //           id: user._id,
    //           name: user.name,
    //           email: user.email,
    //           type: 'user',
    //           profile_image: user.profile_image,
    //           phone: user.phone,
    //         };
    //       }
    //       return null;
    //     }
    //     return null;

    //     return null;
    //   },
    // }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // console.log(token);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.type = user.type;
        token.profile_image = user.profile_image;
        token.phone = user.phone ? user.phone : null;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.email = token.email;
        session.type = token.type;
        session.profile_image = token.profile_image;
        session.phone = token.phone;
      }

      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  session: {
    jwt: true,
    updateAge: 1000 * 60 * 60 * 24,
  },
  //   pages: {
  //     signIn: "signin",
  //   },
  database: process.env.DATABASE_CONNECTION,
  debug: true,
});
