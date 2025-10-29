import { Module } from '@nestjs/common'
import { ProjectsModule } from './modules/projects/projects.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ContactModule } from './modules/contact/contact.module'

@Module({
	imports: [PrismaModule, ProjectsModule, ContactModule]
})
export class AppModule {}