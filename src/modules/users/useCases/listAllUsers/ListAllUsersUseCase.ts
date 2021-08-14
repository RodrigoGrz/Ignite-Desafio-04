import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userExist = this.usersRepository.findById(user_id);

    if(!userExist) {
      throw new Error("User not exists");
    }

    const userIsAdmin = userExist.admin;

    if(userIsAdmin === false) {
      throw new Error("User is not a admin");
    } 

    const user = this.usersRepository.list();

    return user;
  }
}

export { ListAllUsersUseCase };
