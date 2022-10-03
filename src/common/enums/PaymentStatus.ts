export enum PaymentStatus {
    Debit = 1, // Adeudo
    PaiOut = 2, // Pagado
    Condoned = 3, // Condonado/Perdonado
    Cancelled = 4, // Cancelado
    Abonar = 5, // Abonado
    quotation = 6, // Cotizacion
    trusted = 7 // Fiado
}

export enum InscriptionStatus {
    Registered = 1, // Registrado
    SignedUp = 2, // Inscrito
    Baja = 3, // de baja
}

export enum StudentInscriptionStatus {
    disabled = '0',
    activated = '1'
}

export enum InscriptionStatusStudent {
    UnSubscribed  = 0,
    NewEnrollment = 1,
    ReEnrollment = 2,
    ReEntry = 3,
}
