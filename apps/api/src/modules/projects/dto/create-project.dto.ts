import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateProjectDto {
	@ApiProperty()
	@IsString()
	title!: string

	@ApiProperty()
	@IsString()
	description!: string

	@ApiProperty({ required: false })
	@IsUrl()
	@IsOptional()
	demoUrl?: string

	@ApiProperty({ required: false, type: [String] })
	@IsArray()
	@IsOptional()
	tags?: string[]
}