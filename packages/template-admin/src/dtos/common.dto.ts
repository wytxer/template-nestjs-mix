import { IsNotEmpty, IsInt, Min, IsOptional, IsString, IsEnum, IsDateString, MaxLength, IsUUID } from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { SortOrderEnum } from 'domains'
import { transformText } from 'helpers'

/**
 * 通用的分页接口参数
 */
export class CommonPaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ description: '当前分页', example: 1 })
  pageNo?: number = 1

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ description: '分页条数', example: 10 })
  pageSize?: number = 10
}

/**
 * 通用的时间接口参数
 */
export class CommonTimeDto {
  @IsOptional()
  @IsDateString({}, { each: true })
  @ApiProperty({ description: '创建时间', example: ['2020-01-01 00:00:00', '2020-01-02 00:00:00'] })
  createdAt?: string[]

  @IsOptional()
  @IsDateString({}, { each: true })
  @ApiProperty({ description: '更新时间', example: ['2020-01-01 00:00:00', '2020-01-02 00:00:00'] })
  updatedAt?: string[]
}

/**
 * 通用的排序接口参数
 */
export class CommonSortDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '排序字段', example: 'createdAt' })
  sortField?: string

  @IsOptional()
  @IsEnum(SortOrderEnum)
  @ApiProperty({ description: '排序方式', example: SortOrderEnum.desc })
  sortOrder?: SortOrderEnum
}

export class CommonPaginationAndTimeDto extends IntersectionType(CommonPaginationDto, CommonTimeDto) {}
export class CommonPaginationAndSortDto extends IntersectionType(CommonPaginationDto, CommonSortDto) {}
export class CommonTimeAndSortDto extends IntersectionType(CommonTimeDto, CommonSortDto) {}

/**
 * 通用的文件结构
 */
export class CommonFileDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(160)
  @Transform(transformText)
  @ApiProperty({ description: '文件名称', example: '文件名.png' })
  fileName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '文件路径',
    example: 'https://static.bszhct.com/common/default-avatar.jpg'
  })
  filePath: string
}

/**
 * 文件上传接口参数
 */
export class CommonUploadDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '文件 key', example: 'logo-bszhct-com' })
  key?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '文件名', example: 'logo-bszhct-com.png' })
  originalName?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '是否私有存储', example: false })
  private?: string
}
