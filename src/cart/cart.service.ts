import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

type Identifier = string | ObjectId | Types.ObjectId;

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) { }

  async addItem(userId: Identifier, dto: AddItemDto): Promise<Cart> {
    const { grocery, quantity } = dto;

    let cartExists = await this.cartModel.findOne({ user: userId, grocery });
    if (!cartExists) {
      cartExists = new this.cartModel({ user: userId, ...dto });
    } else {
      cartExists.quantity += quantity;
    }
    return cartExists.save();
  }

  async getCart(userId: Identifier, cartId: Identifier): Promise<Cart> {
    const cart = await this.cartModel.findOne({
      _id: cartId,
      user: userId
    })
      .populate('grocery')
      .exec();

    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async getAllCarts(userId: Identifier): Promise<Cart[]> {
    const carts = await this.cartModel.find({ user: userId })
      .populate('grocery')
      .exec();

    return carts;
  }

  async updateItem(userId: Identifier, cartId: Identifier, dto: UpdateItemDto): Promise<Cart> {
    const { quantity } = dto;
    
    const cart = await this.cartModel.findOne({_id: cartId, user: userId })
      .exec();

    if (!cart) throw new NotFoundException('Cart not found');
    
    cart.quantity = quantity;
    return cart.save();
  }

  async removeItem(userId: Identifier, cartId: string): Promise<string> {
    const cart = await this.cartModel.findOneAndDelete({_id: cartId, user: userId })
      .exec();

    if (!cart) throw new NotFoundException('Cart not found');

    return 'Cart deleted successfully!'
  }

}