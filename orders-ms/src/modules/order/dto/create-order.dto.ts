import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
@IsArray()
@ArrayMinSize(1)
//Validación de los elementos
@ValidateNested({each:true})
@Type(() => OrderItemDto)
items: OrderItemDto[]
}
