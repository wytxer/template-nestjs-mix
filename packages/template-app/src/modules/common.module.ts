import { Module } from '@nestjs/common'
import { FileService } from '@services/file.service'
import { CommonService } from '@services/common.service'
import { CommonController } from '@controllers/common.controller'

@Module({
  imports: [],
  controllers: [CommonController],
  providers: [FileService, CommonService],
  exports: [CommonService]
})
export class CommonModule {}
