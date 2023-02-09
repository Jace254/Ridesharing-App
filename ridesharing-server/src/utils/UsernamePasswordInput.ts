import { Field, InputType } from "type-graphql";

@InputType()
export class UsernameEmailPasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
