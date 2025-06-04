import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Grocery, GroceryDocument } from './schemas/grocery.schema';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';

type Identifier = string | ObjectId | Types.ObjectId;

@Injectable()
export class GroceryService {
  constructor(@InjectModel(Grocery.name) private groceryModel: Model<GroceryDocument>) { }

  async create(dto: CreateGroceryDto): Promise<Grocery> {
    const { name } = dto;

    const grocery = await this.groceryModel.findOne({ name }).exec();
    if (grocery) {
      throw new BadRequestException(`Grocery item with name ${name} already exists`);
    }

    const addGrocery = await this.groceryModel.create(dto);
    return addGrocery
  }

  async findAll(): Promise<Grocery[]> {
    const groceries = await this.groceryModel.find().exec();

    return groceries;
  }

  async findOne(id: Identifier): Promise<Grocery> {
    const grocery = await this.groceryModel.findById(id).exec();
    if (!grocery) throw new NotFoundException(`Grocery item with id ${id} not found`);
    return grocery;
  }

  async update(id: Identifier, dto: UpdateGroceryDto): Promise<Grocery> {
    const updated = await this.groceryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Grocery item with id ${id} not found`);
    return updated;
  }

  async remove(id: Identifier): Promise<string> {
    const result = await this.groceryModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Grocery item with id ${id} not found`);

    return `Grocery item with id ${id} deleted successfully`;
  }
}
