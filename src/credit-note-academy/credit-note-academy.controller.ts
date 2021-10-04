import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Comprobante, Receptor, XmlEmisorAttribute, XmlReceptorAttribute } from '@signati/core';
import { ConfigService } from '../common/config/config.service';
import { ConceptWithTaxes, CreditNoteAcademyService } from './credit-note-academy.service';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';

@Crud({
    model: {
        type: CreditNoteAcademy,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null
            },
        },
        join: {

        }
    }
})
@Controller('credit-note-academy')
export class CreditNoteAcademyController implements CrudController<CreditNoteAcademy> {
    constructor(readonly service: CreditNoteAcademyService, readonly configService: ConfigService) {
    }

    @Post('/generate-credit-note')
    async generateCreditNote(
        @Body() request: {
            invoice: Partial<Comprobante>,
            receiver: Partial<XmlReceptorAttribute>, issuer: Partial<XmlEmisorAttribute>
            concepts: ConceptWithTaxes[],
            cfdiRelations: string[],
            branchOfficeId: string | number,
            branchOfficeModuleId: string | number,
        }): Promise<void> {
        if (!request) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
        if (!request.invoice) {
            throw new HttpException('Invoice data is required', HttpStatus.BAD_REQUEST);
        }
        if (!request.receiver) {
            throw new HttpException('Receiver data is required', HttpStatus.BAD_REQUEST);
        }
        if (!request.issuer) {
            throw new HttpException('Issuer data is required', HttpStatus.BAD_REQUEST);
        }
        if (request.concepts.length === 0) {
            throw new HttpException('Must send al least one concept', HttpStatus.BAD_REQUEST);
        }
        if(request.cfdiRelations.length === 0) {
            throw new HttpException('Must send al least one document', HttpStatus.BAD_REQUEST);
        }
        if(!request.branchOfficeId) {
            throw new HttpException('branchOfficeId data is required', HttpStatus.BAD_REQUEST);
        }
        if(!request.branchOfficeModuleId) {
            throw new HttpException('branchOfficeModuleId data is required', HttpStatus.BAD_REQUEST);
        }
        const workPath = this.configService.getPath();
        const xmlCreditNote = await this.service.createCreditNote(
            request.invoice,
            request.receiver,
            request.issuer,
            request.concepts,
            request.cfdiRelations,
            request.branchOfficeId,
            request.branchOfficeModuleId,
            workPath,
        );

    }

    @Get('/get-folio')
    async getfolio(): Promise<Number> {
        return await this.service.getFolio();
    }
}
