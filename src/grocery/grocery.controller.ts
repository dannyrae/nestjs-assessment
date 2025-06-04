import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('groceries')
@UseGuards(AuthGuard)
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post()
  create(@Body() createGroceryDto: CreateGroceryDto) {
    return this.groceryService.create(createGroceryDto);
  }

  @Get()
  findAll() {
    return this.groceryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groceryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroceryDto: UpdateGroceryDto) {
    return this.groceryService.update(id, updateGroceryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groceryService.remove(id);
  }
}
