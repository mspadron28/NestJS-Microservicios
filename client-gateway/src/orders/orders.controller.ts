import {
  Controller,
  Get,
  Post,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
  Body,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrder',orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(@Param() statusDto: StatusDto,
  @Query() paginationDto: PaginationDto
) {
    try {
      return this.ordersClient.send('findAllOrder',{
        ...paginationDto,
        status: statusDto.status,
      })

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    try {
      return this.ordersClient.send('changeOrderStatus',{ id, status: statusDto.status})
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
