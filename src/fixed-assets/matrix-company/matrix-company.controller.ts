import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MatrixCompany } from './entities/matrix-company.entity';
import { MatrixCompanyService } from './matrix-company.service';

@Crud({
    model: {
        type: MatrixCompany,
    },
})
@Controller()
export class MatrixCompanyController implements CrudController<MatrixCompany> {
    constructor(public service: MatrixCompanyService) {
    }
}
