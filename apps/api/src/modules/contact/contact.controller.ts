import { Body, Controller, Post } from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from '../projects/dto/create-contact.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() dto: CreateContactDto) {
    console.log('Contact received:', dto)
    return this.contactService.create(dto)
  }
}
