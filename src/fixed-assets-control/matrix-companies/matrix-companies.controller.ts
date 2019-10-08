import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MatrixCompany } from './entities/matrix-company.entity';
import { MatrixCompaniesService } from './matrix-companies.service';

@Crud({
    model: {
        type: MatrixCompany,
    },
    query: {
        join: {
            branches: {},
        },
    },
})
@Controller()
export class MatrixCompaniesController implements CrudController<MatrixCompany> {
    constructor(public service: MatrixCompaniesService) {
    }
}
