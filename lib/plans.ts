export const PLANS = {
    free: {
        name: 'Free',
        price: { monthly: 0, yearly: 0 },
        limits: {
            staticQRCodes: 3,        // lifetime total
            dynamicQRCodes: 0,       // not allowed
            logoUpload: false,
            analyticsRetentionDays: 0,
            bulkGeneration: false,
            svgDownload: false,
            pdfDownload: false,
            apiAccess: false,
            customDomain: false,
            whitelabelQR: false,
        }
    },
    maker: {
        name: 'Maker',
        price: { monthly: 299, yearly: 2990 }, // 2990 = 299 * 10 (2 months free)
        limits: {
            staticQRCodes: 25,       // per month
            dynamicQRCodes: 10,      // lifetime total
            logoUpload: true,
            analyticsRetentionDays: 30,
            bulkGeneration: false,
            svgDownload: true,
            pdfDownload: false,
            apiAccess: false,
            customDomain: false,
            whitelabelQR: false,
        }
    },
    pro: {
        name: 'Pro',
        price: { monthly: 699, yearly: 6990 },
        limits: {
            staticQRCodes: Infinity,
            dynamicQRCodes: Infinity,
            logoUpload: true,
            analyticsRetentionDays: 30,
            bulkGeneration: false,
            svgDownload: true,
            pdfDownload: true,
            apiAccess: false,
            customDomain: false,
            whitelabelQR: false,
        }
    },
    enterprise: {
        name: 'Enterprise',
        price: { monthly: 1999, yearly: 19990 },
        limits: {
            staticQRCodes: Infinity,
            dynamicQRCodes: Infinity,
            logoUpload: true,
            analyticsRetentionDays: 365,
            bulkGeneration: true,
            svgDownload: true,
            pdfDownload: true,
            apiAccess: true,
            customDomain: true,
            whitelabelQR: true,
        }
    }
} as const;

export type PlanType = keyof typeof PLANS;
