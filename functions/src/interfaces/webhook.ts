export enum EPaymentMethod {
    'NONE' = 0,
    'VISA' = 1,
    'BOLBRADESCO' = 2,
    'AMEX' = 3,
    'ELO' = 4,
    'HIPERCARD' = 5,
    'MASTER' = 6,
    'MELICARD' = 7,
    'FREE_PRICE' = 8,
}

export enum EShippingType {
    'GRATIS' = 1,
    'FIXO' = 2,
}

export enum EPaymentType {
    'NONE' = 0,
    'CREDIT_CARD' = 1,
    'BOLETO' = 2,
    'PAYPAL' = 3,
    'CREDIT_CARD_RECURRENT' = 4,
    'FREE_PRICE' = 5,
    'CREDIT_CARD_UPSELL' = 6,
}

export enum ESaleStatus {
    'NONE' = 0,
    'PENDING' = 1, // boleto pendente
    'APPROVED' = 2, // venda aprovada boleto ou cartão
    'IN_PROCESS' = 3, // em revisão manual
    'IN_MEDIATION' = 4, // em moderação
    'REJECTED' = 5, // rejeitado
    'CANCELLED' = 6, // cancelado do cartão
    'REFUNDED' = 7, // devolvido
    'AUTHORIZED' = 8, // autorizada
    'CHARGED_BACK' = 9, // solicitado charge back
    'COMPLETED' = 10, // 30 dias após a venda aprovada
    'CHECKOUT_ERROR' = 11, // erro durante checkout
    'PRECHECKOUT' = 12, // abandono
    'EXPIRED' = 13, // boleto expirado
    'IN_REVIEW' = 16, // em análise
}

export enum ECustomerType {
    'PHYSICS' = 1,
    'JURIDICAL' = 2,
}

export enum EAffiliationType {
    'PLATFORM' = 0, //'Plataforma',
    'PRODUCER' = 1, //'Produtor',
    'CO_PRODUCER' = 2, //'Co-Produtor',
    'AFFILIATE_MANAGEMENT' = 3, //'Gerente de Afiliados',
    'PARTNER' = 4, //'Parceiro',
    'AFFILIATE' = 5, //'Afiliado',
    'PREMIUM' = 6, // 'Prêmio'
    'PROVIDER' = 7, // 'Fornecedor'
}

export interface IProduct {
    code: string
    name: string
    external_reference: string
    guarantee: number
}

export interface IPlan {
    code: string
    name: string
    quantity: number
}

export interface ICustomer {
    customer_type_enum: ECustomerType
    full_name: string
    email: string
    identification_type: 'CPF' | 'CNPJ'
    identification_number: string
    /**
     * Format: YYYY-MM-DD
     */
    birthday: string
    phone_area_code: string
    phone_number: string
    street_name: string
    street_number: string
    district: string
    complement: ''
    zip_code: string
    city: string
    state: string
    country: string
}

export interface IMetadata {
    src: string | null
    utm_source: string | null
    utm_medium: string | null
    utm_campaign: string | null
    utm_term: string | null
    utm_content: string
    utm_perfect: string | null
}

export interface IComission {
    name: string
    commission_amount: number
    affiliation_type_enum: EAffiliationType
    affiliation_code?: string
    email?: string
    identification_number?: string
}

export interface IMarketPlace {
    name: string
    itens: number
    sale: number
}

export interface IPerfectPayPayload {
    token: string
    code: string
    sale_amount: number
    currency_enum: 1
    coupon_code: string
    installments: number
    installment_amount: number | null
    shipping_type_enum: EShippingType
    shipping_amount: number | null
    payment_method_enum: EPaymentMethod
    payment_type_enum: EPaymentType
    billet_url: string
    billet_number: string
    /**
     * Format: YYYY-MM-DD HH:mm:ss
     */
    billet_expiration: string
    quantity: 5
    sale_status_enum: ESaleStatus
    sale_status_detail: string
    /**
     * Format: YYYY-MM-DD HH:mm:ss
     */
    date_created: string
    /**
     * Format: YYYY-MM-DD HH:mm:ss
     */
    date_approved: string | null
    product: IProduct
    plan: IPlan
    plan_itens: any[]
    customer: ICustomer
    metadata: IMetadata
    webhook_owner: string
    commission: IComission[]
    marketplaces: Record<string, IMarketPlace>
}
