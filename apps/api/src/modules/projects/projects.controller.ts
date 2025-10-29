import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { CreateProjectDto } from './dto/create-project.dto'

@Controller('projects')
export class ProjectsController {
	constructor(private service: ProjectsService) {}

	@Get()
	list() {
		return this.service.list()
	}

	@Post()
	create(@Body() dto: CreateProjectDto) {
		return this.service.create(dto)
	}
}