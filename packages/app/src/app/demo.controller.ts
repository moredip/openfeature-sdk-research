import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { fibonacci } from '@openfeature/fibonacci';
import { HexColorService } from './hex-color/hex-color.service';
import { InstallService } from './install/install.service';
import { MessageService } from './message/message.service';
import { writeFile, readFile } from 'fs/promises';

const JSON_FILE = 'flags.json';

@Controller()
export class DemoController {
  constructor(
    private readonly messageService: MessageService,
    private readonly installService: InstallService,
    private helloService: HexColorService
  ) {}

  @Get()
  getGreeting() {
    return this.messageService.getMessage();
  }

  @Get('hex-color')
  async getHexColor() {
    return {
      color: await this.helloService.getHexColor(),
    };
  }

  @Get('install-instructions')
  getInstallMarkup() {
    return this.installService.getInstallInstructions();
  }

  @Get('fibonacci')
  getFibonacci(@Query('num') num: string) {
    // TODO: validation
    return fibonacci(Number.parseInt(num));
  }

  @Get('json')
  async getJson() {
    return await (await readFile(JSON_FILE)).toString();
  }

  @Put('json')
  async putJson(@Body() body: unknown) {
    try {
      JSON.parse(JSON.stringify(body));
    } catch (err) {
      throw new BadRequestException('Invalid JSON');
    }
    try {
      await writeFile(JSON_FILE, JSON.stringify(body));
    } catch (err) {
      throw new InternalServerErrorException('Unable to write JSON file.');
    }
  }
}
