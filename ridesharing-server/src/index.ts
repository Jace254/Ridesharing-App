import { COOKIE_NAME, dataSource, secret, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import console from "console";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import session from "express-session";
import cors from "cors";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { RideResolver } from "./resolvers/ride";

const main = async () => {
  
  await dataSource.initialize();

  await dataSource.runMigrations();

  const app = express();

  let RedisStore = connectRedis(session);

  //ioredis
  const redis = new Redis();
  redis.on("connect", () => console.log("Connected to Redis"));
  redis.on("error", (err: Error) => console.log("Redis Client Error: ", err));

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 315360000000,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: secret,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver, RideResolver],
      validate: false,
    }),
    plugins: [
      __prod__
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              "request.credentials": "include",
            },
          }),
    ],
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log(`app listening on localhost:4000 !`);
  });
};

main();
