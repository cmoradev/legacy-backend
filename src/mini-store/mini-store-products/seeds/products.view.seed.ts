import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";


export default class ProductsViewSeeds implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP VIEW IF EXISTS vw_tie_products`);
        await queryRunner.query(`
        CREATE VIEW vw_tie_products AS
        SELECT
            p.id AS productsId,
            p.nombre AS product_name,
            p.codigo AS product_code,
            p.stock AS storage_quantity,
            p.minstock AS minimum_storage,
            p.maxstock AS maximum_storage,
            c.id AS classificationsId,
            c.nombre AS classification_name,
            lp.id AS listId,
            lp.nombre AS list_name
        FROM tie_productos p
        LEFT JOIN tie_listaprecios lp ON lp.id = p.StorePriceListId
        LEFT JOIN tie_clasificaciones c ON c.id = p.StoreClassificationId
        ORDER BY p.id DESC`);
    }
}