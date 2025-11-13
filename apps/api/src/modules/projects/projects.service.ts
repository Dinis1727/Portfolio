import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProjectDto } from './dto/create-project.dto'

@Injectable()
export class ProjectsService {
	constructor(private prisma: PrismaService) {}

	list() {
		return (this.prisma as any).project.findMany({ orderBy: { createdAt: 'desc' } })
	}

	create(dto: CreateProjectDto) {
		return (this.prisma as any).project.create({ data: dto })
	}
  
	async deleteProject(id: number) {
		return (this.prisma as any).project.delete({
			where: { id },
		});
	}
}