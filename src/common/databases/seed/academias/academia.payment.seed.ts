import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class AcademiaPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_aca_payments;`);
        await connection.query(`
        CREATE VIEW vw_aca_payments AS
        SELECT
            p.id AS p_id,
            f.id AS f_id,
            v.id AS v_id,
            v.folio AS v_folio,
            p.folio AS p_folio,
            CASE 
				WHEN f.folio IS NOT NULL THEN f.folio
				WHEN p.globalUuid IS NOT NULL THEN 'Folio global'
            ELSE 'N/A' END AS f_folio,
            CASE 
				WHEN f.status IS NOT NULL THEN f.status
                WHEN p.globalUuid IS NOT NULL THEN 'Estatus global'
			ELSE 'N/A' END AS f_status,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            p.quantity AS p_quantity,
            p.change AS p_change,
            v.observaciones AS v_observaciones,
            CAST((p.quantity - p.change) AS DECIMAL(12,6)) AS p_income,
            a.id AS a_id,
            a.id_modalidad AS a_type,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            p.academyPaymentOfficeId AS v_branch_office,
            v.ciclo AS v_cycle,
            v.id_estado_pago AS v_status,
            p.createdAt AS p_created_at,
            f.createdAt AS f_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state,
            (select p_way_name from vw_aca_way_payments where p.id = f.id Limit 1) AS f_metodo_pago,
            (select p_way from vw_aca_way_payments where p.id = f.id Limit 1) AS f_metodo_pago_codigo,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            (CONCAT(pu.nombre, ' ', pu.ap_paterno, ' ', pu.ap_materno)) AS p_fullname_cashier,
            (CONCAT(puc.nombre, ' ', puc.ap_paterno, ' ', puc.ap_materno)) AS p_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id,
            pu.id AS p_cashier_id,
            puc.id AS p_cancelation_id,
            (select p_way from vw_aca_way_payments where p_id = p.id Limit 1) AS p_metodo_pago_codigo,
			(select p_way_name from vw_aca_way_payments where p_id = p.id Limit 1) AS p_metodo_pago,
			(SELECT GROUP_CONCAT(CONCAT(chargeDetailId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
				FROM ac_charges_details_extra_charges
				where chargeDetailId IN
				(SELECT id FROM ac_cobro_detalle where id_ac_cobro = v.id)
			) AS extras,
			(SELECT SUM(CAST((tempa.quantity - tempa.change) AS DECIMAL(12, 6)))
			from ac_charge_payments tempa
			where academyChargeId = v.id
			  and id not in (p.id)
			  and paymentStatusId in (2,3)
			) AS p_total_without_current,
		   (SELECT GROUP_CONCAT(CONCAT(id,';',cantidad,';',precio)) 
           FROM ac_cobro_detalle where id_ac_cobro = v.id) AS details,
		   (SELECT SUM(CAST((cantidad * precio) AS DECIMAL(12, 6)))
			FROM ac_cobro_detalle
			where id_ac_cobro = v.id
            ) AS total_details_without_extra

        FROM ac_charge_payments p

        LEFT JOIN ac_cobros v ON v.id = p.academyChargeId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN ac_facturas f ON p.id = f.academyChargePaymentId
        LEFT JOIN usuarios u ON u.id = v.id_agente
        LEFT JOIN usuarios us ON us.id = v.id_agente_cancelacion
        LEFT JOIN usuarios pu ON pu.id = p.cashierChargeId
        LEFT JOIN usuarios puc ON puc.id = p.cashierChargeCancellationId
        
        ORDER BY v.id DESC;
        `);
    }
}
