import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import permissionActionsAction from "./permission..actions.action.dev.catalogue";


export default class CreatePermissionActionsAction implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('permission_actions_action')
            .values([
                ...permissionActionsAction
            ])
            .orIgnore()// para ignorar valores duplicado
            .execute()
    }
}

