import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';
import { OrderListValidator } from '../validators/order/list';
import { OrderSaveValidator } from '../validators/order/save';

@Controller('/order')
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: OrderListValidator) {
    return this.orderRepository.list(model);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderRepository.findById(orderId);
  }

  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: OrderSaveValidator) {
    return this.orderService.save(model);
  }
}
