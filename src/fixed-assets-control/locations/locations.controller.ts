import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Location } from './entities/location.entity';
import { LocationsService } from './locations.service';

@Crud({
    model: {
        type: Location,
    },
    query: {
        limit: 10,
        join: {
            department: {eager: false},
        },
    },
})
@Controller()
export class LocationsController implements CrudController<Location> {
    constructor(public service: LocationsService) {
    }
}
