import { Department } from "../../department/schemas/department.schema";

export class CreateUserDto {
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
  readonly department: Department;
}
