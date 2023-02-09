import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const IsAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error(
      "not authenticated: you dont have the facilities for that big man"
    );
  }

  return next();
};
