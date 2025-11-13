import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, message }: { name: string; email: string; message: string }) {
    const contact = await this.prisma.contact.create({
      data: { name, email, message },
    })

    console.log('Contact saved to database:', contact)
    return contact
  }
}
