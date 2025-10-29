import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

	const config = new DocumentBuilder()
		.setTitle('Portfolio API')
		.setDescription('Endpoints para projetos, skills e contacto')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	const port = process.env.PORT || 4000
	await app.listen(port)
	console.log(`API listening on http://localhost:${port}`)
}
bootstrap()