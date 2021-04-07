import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Users, UsersDocument } from "./schemas/users.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IGettingUser } from "./interfaces/user.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async getAll(): Promise<IGettingUser[]> {
    return this.getUsers();
  }

  async getOne(id: string): Promise<IGettingUser> {
    const [user] = await this.getUsers(id);
    return user;
  }

  async create(payload: CreateUserDto): Promise<Users> {
    const res = new this.userModel(payload);
    return res.save();
  }

  async update(id: string, payload: UpdateUserDto): Promise<Users> {
    const department = Types.ObjectId(payload.department)
    return this.userModel.findByIdAndUpdate(id, { ...payload, department });
  }

  async delete(id: string): Promise<any> {
    return this.userModel.findByIdAndRemove(id);
  }

  getUsers(id?: string) {
    return this.userModel.aggregate()
      .match({ _id: Types.ObjectId(id) })
      .lookup({
        from: 'departments',
        localField: 'department',
        foreignField: '_id',
        as: 'department_join'
      })
      .unwind({
        path: '$department_join',
        preserveNullAndEmptyArrays: true
      })
      .project({
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        department: '$department_join'
      });
  }
}
