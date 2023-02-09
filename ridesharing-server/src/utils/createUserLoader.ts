import DataLoader from "dataloader";
import { In } from "typeorm";
import { User } from "../entitites/User";

export const createUserLoader = new DataLoader<number, User>(
  async (userIds) => {
    console.log("userIds", userIds);
    const users = await User.findBy({ id: In(userIds as number[]) });
    const userIdToUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });
    console.log("map", userIdToUser);
    const sortedUsers = userIds.map((userId) => userIdToUser[userId]);
    console.log("sortedUsers", sortedUsers);

    return sortedUsers;
  }
);
