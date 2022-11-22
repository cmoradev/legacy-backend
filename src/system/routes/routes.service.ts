import {Injectable, NotFoundException} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Route } from './entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { IQueryRoutesFatherDto, IQueryRoutesChildDto } from './dto/query-routes.dto';
import { Decimal } from '@munyaal/calculations'

@Injectable()
export class RoutesService extends TypeOrmCrudService<Route> {
    constructor(
        @InjectRepository(Route, ColegioDBNameConnection) readonly repo: Repository<Route>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.restore(id);
    }

    public getRoots() {
        return this.repo.manager.getTreeRepository(Route).findTrees();
    }

    public async getFathers({
        limit,
        offset,
        text
    }: IQueryRoutesFatherDto) {
        const result = this.repo.createQueryBuilder('route')
            .select([
                "id",
                "name",
                "level",
                "icon",
                "url",
                "isActive",
                "mpath",
                "fatherID",
            ])
            .addSelect(subQuery => {
                return subQuery
                    .select('GROUP_CONCAT(id)')
                    .from(Route, "routef")
                    .where('routef.fatherID = route.id');
            }, 'childs')
            .where("route.fatherID is null")
            .limit(limit)
            .offset(offset)
            .orderBy('route.level', 'ASC');
        if (text && text != '') {
            result.andWhere("route.name like :name", { name: `%${text}%` });
        }
        const total = await result.getCount();
        return {
            data: await result.getRawMany(),
            count: +limit,
            total,
            page: offset == 0 ? 1 : Math.round(Decimal.div(total, +limit).toNumber()),
            pageCount: Math.ceil(total / +limit)
        }
    }

    public async getChilds({
        ids,
        limit,
        offset,
        text
    }: IQueryRoutesChildDto) {

        const result = this.repo.createQueryBuilder('route')
            .select([
                "id",
                "name",
                "level",
                "icon",
                "url",
                "isActive",
                "mpath",
                "fatherID",
            ])
            .addSelect(subQuery => {
                return subQuery
                    .select('GROUP_CONCAT(id)')
                    .from(Route, "routef")
                    .where('routef.fatherID = route.id');
            }, 'childs')
            .where('route.id IN (:...array)', { array: ids.map((i: number) => { return parseInt(`${i}`) }) })
            .limit(limit)
            .offset(offset)
            .orderBy('route.level', 'ASC');
        if (text && text != '') {
            result.andWhere("route.name like :name", { name: `%${text}%` });
        }
        const total = await result.getCount();
        return {
            data: await result.getRawMany(),
            count: +limit,
            total,
            page: offset == 0 ? 1 : Math.round(Decimal.div(total, +limit).toNumber()),
            pageCount: Math.ceil(total / +limit)
        }
    }
}
