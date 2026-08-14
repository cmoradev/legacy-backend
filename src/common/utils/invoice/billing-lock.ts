/**
 * Lock en memoria para serializar la facturación de un mismo pago.
 *
 * Evita la doble facturación cuando dos peticiones concurrentes intentan
 * timbrar el mismo pago: la segunda espera a que termine la primera y, al
 * ejecutarse dentro del lock, vuelve a pasar por la verificación de
 * idempotencia (checkExistingStamping) devolviendo la factura existente.
 */
export class BillingLock {
  private static readonly locks = new Map<string, Promise<unknown>>();

  /**
   * Ejecuta `fn` de forma serializada por `key`.
   * Si ya hay una ejecución en curso para `key`, espera a que termine
   * antes de ejecutar la siguiente.
   */
  static acquire<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const previous = this.locks.get(key) || Promise.resolve();
    const current = previous
      .catch(() => undefined)
      .then(() => fn());

    this.locks.set(key, current);

    return current.finally(() => {
      if (this.locks.get(key) === current) {
        this.locks.delete(key);
      }
    });
  }
}
