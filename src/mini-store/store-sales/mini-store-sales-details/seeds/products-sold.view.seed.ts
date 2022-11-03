import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class ProductsSoldViewSeeds implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const queryRunner = connection;
    await queryRunner.query(`DROP VIEW IF EXISTS vw_tie_products_sold`);
    await queryRunner.query(`
        CREATE VIEW vw_tie_products_sold AS
        SELECT
            vd.id AS salesDetailsId,
            vd.createdAt AS vd_start_date,
            vd.unitMeasurement AS vd_measurement_unit,
            vd.cantidad AS vd_quantity,
            p.id AS productsId,
            p.nombre AS product_name,
            p.precio AS product_price,
            p.precio_con_iva AS product_price_IVA,
            p.iva AS product_IVA,
            c.id AS classificationsId,
            c.nombre AS classifications_name
        FROM tie_venta_detalle vd
        LEFT JOIN tie_productos p ON p.id = vd.miniStoreProductId
        LEFT JOIN tie_clasificaciones c ON c.id = vd.miniStoreClassificationId
        ORDER BY vd.id DESC`);
  }
}
