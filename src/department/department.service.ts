import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Department, DepartmentDocument } from "./schemas/department.schema";
import { Model } from "mongoose";
import { CreateDeptDto } from "./dto/create-dept.dto";
import { UpdateDeptDto } from "./dto/update-dept.dto";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private deptModel: Model<DepartmentDocument>,
  ) {}

  async getAll(): Promise<Department[]> {
    return this.deptModel.find().exec();
  }

  async getOne(id: string): Promise<Department> {
    return this.deptModel.findById(id);
  }

  async create(deptPayload: CreateDeptDto): Promise<Department> {
    const res = new this.deptModel(deptPayload);
    return res.save();
  }

  async update(id: string, deptPayload: UpdateDeptDto): Promise<Department> {
    return this.deptModel.findByIdAndUpdate(id, deptPayload);
  }

  async delete(id: string): Promise<any> {
    return this.deptModel.findByIdAndRemove(id);
  }
}
