import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "./schemas/users.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private deptModel: Model<UsersDocument>,
  ) {}

  async create(userDto) {

  }
}
