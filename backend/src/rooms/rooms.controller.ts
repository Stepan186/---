import { Body, Controller, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { GetRoomsDto } from "./dto/get-rooms.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Номера")
@Controller('rooms')
export class RoomsController {
    constructor(
        private readonly service: RoomsService
    ) {
    }

    @Post('getMany')
    getMany(@Body() dto: GetRoomsDto) {
        return this.service.getMany(dto);
    }
}