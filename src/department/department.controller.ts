import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { CreateDeptDto } from "./dto/create-dept.dto";
import { UpdateDeptDto } from "./dto/update-dept.dto";

@Controller('department')
export class DepartmentController {
  constructor(
    private readonly deptService: DepartmentService,
  ) {}

  @Get()
  getAll() {
    return this.deptService.getAll()
  }

  @Get('id')
  getOne(@Param('id') id: string) {
    return this.deptService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateDeptDto) {
    return this.deptService.create(payload);
  }

  @Put()
  update(@Body() payload: UpdateDeptDto, @Param('id') id: string) {
    return this.deptService.update(id, payload);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.deptService.delete(id);
  }
}
