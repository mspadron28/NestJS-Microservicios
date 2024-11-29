import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module'; 
import { PrismaModule } from './modules/prisma/prisma.module';


@Module({
  imports: [OrderModule, PrismaModule],
  
})
export class AppModule {}
