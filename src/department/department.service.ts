import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Department, DepartmentDocument } from "./schemas/department.schema";
import { Model, Types } from "mongoose";
import { CreateDeptDto } from "./dto/create-dept.dto";
import { UpdateDeptDto } from "./dto/update-dept.dto";
import { IGettingDept } from "./interfaces/department.interface";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private deptModel: Model<DepartmentDocument>,
  ) {}

  async getAll(): Promise<IGettingDept[]> {
    return this.deptModel.aggregate()
      .lookup(this.getJoinUser())
  }

  async getOne(id: string): Promise<IGettingDept> {
    const [department] = await this.deptModel.aggregate()
      .match({ _id: Types.ObjectId(id) })
      .lookup(this.getJoinUser())

    return department;
  }

  async create(payload: CreateDeptDto): Promise<Department> {
    const res = new this.deptModel(payload);
    return res.save();
  }

  async update(id: string, payload: UpdateDeptDto): Promise<Department> {
    return this.deptModel.findByIdAndUpdate(id, payload);
  }

  async delete(id: string): Promise<any> {
    return this.deptModel.findByIdAndRemove(id);
  }

  private getJoinUser = () => ({
    from: 'users',
    let: { departmentId: "$_id" },
    pipeline: [
      {
        $match: {
          $expr: {
            $eq: ['$department', '$$departmentId']
          }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
        }
      }
    ],
    as: 'users'
  })
}
