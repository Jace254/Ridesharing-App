import { Ride } from "../entitites/Ride";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IsAuth } from "../middlewares/isAuth";
import { User } from "../entitites/User";

@InputType()
class RideInput {
  @Field()
  to: string;

  @Field()
  from: string;

  @Field()
  when: Date;

  @Field()
  seats: number;
}

@Resolver(Ride)
export class RideResolver {
  @FieldResolver(() => User)
  creator(@Root() ride: Ride, @Ctx() { userLoader }: MyContext) {
    const user = userLoader.load(ride.creatorId);
    console.log(user);
    console.log("here2");
    return user;
  }

  @Mutation(() => Ride)
  @UseMiddleware(IsAuth)
  async createRide(
    @Arg("input", () => RideInput) input: RideInput,
    @Ctx() { req }: MyContext
  ): Promise<Ride> {
    return Ride.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }
}
