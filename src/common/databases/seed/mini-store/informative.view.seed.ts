import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class InformativeViewSeeds implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP VIEW IF EXISTS vw_tie_informative`);
        await queryRunner.query(`
        CREATE VIEW vw_tie_informative AS
        SELECT
            v.createdAt as v_createdAt,
            vd.id as vd_id_venta_detalle,
            v.id as v_id_venta,
            v.folio as v_folio_venta,
            v.cycleId as v_cycleId,
            v.storeBranchOfficeId as v_storeBranchOfficeId,
            p.id as p_id_product,
            p.nombre as p_name_product,
            c.id as c_id,
            c.nombre as c_name_classification,
            u.id as u_id_agent,
            CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno) AS u_fullname_agent,
            vd.cantidad as vd_quantity,
            vd.priceWithIVA as vd_price,
            (SELECT GROUP_CONCAT(id) FROM tie_venta_pagos where saleId = v.id ) as ids_ventas_pagos,
            (SELECT GROUP_CONCAT(folio) FROM tie_venta_pagos where saleId = v.id ) as folios_ventas_pagos,
            (vd.priceWithIVA* vd.cantidad) as subtotal

        FROM tie_venta_detalle vd
        LEFT JOIN tie_ventas v ON v.id = vd.miniStoreSaleId
        LEFT JOIN tie_productos p ON p.id = vd.miniStoreProductId
        LEFT JOIN tie_clasificaciones c ON c.id = vd.miniStoreClassificationId
        LEFT JOIN usuarios u ON u.id = v.id_agente
        where v.id_estado_pago = 2
        ORDER BY vd.id DESC;
        `);
    }
}