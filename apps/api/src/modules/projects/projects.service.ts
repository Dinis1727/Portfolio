import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProjectDto } from './dto/create-project.dto'

@Injectable()
export class ProjectsService {
	constructor(private prisma: PrismaService) {}

	list() {
		return this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
	}

	create(dto: CreateProjectDto) {
		return this.prisma.project.create({ data: dto })
	}
}