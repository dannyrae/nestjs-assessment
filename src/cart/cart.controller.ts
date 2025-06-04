import { Controller, Post, Body, UseGuards, Req, Get, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '../auth/auth.guard';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ObjectId, Types } from 'mongoose';

type Identifier = string | ObjectId | Types.ObjectId;

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addItem(@Req() req, @Body() body: AddItemDto) {
    return this.cartService.addItem(req.user.id, body);
  }

  @Get(':cartId')
  getCart(@Req() req, @Param('cartId') cartId: Identifier) {
    return this.cartService.getCart(req.user.id, cartId);
  }

  @Get()
  getAllCarts(@Req() req) {
    return this.cartService.getAllCarts(req.user.id);
  }

  @Patch(':cartId')
  updateItem(@Req() req, @Param('cartId') cartId: Identifier, @Body() dto: UpdateItemDto) {
    return this.cartService.updateItem(req.user.id, cartId, dto);
  }

  @Delete(':cartId')
  removeItem(@Req() req, @Param('cartId') cartId: string) {
    return this.cartService.removeItem(req.user.id, cartId);
  }
}