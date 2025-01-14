import AsyncStorage from "@react-native-async-storage/async-storage";
import { conscentLogger, getEnvDetails, getProducts, requestPurchase, StorageKeys } from "csc-react-native-sdk-test";

export type Sku = string;

type Callbacks = {
    onPurchaseStarted?: () => void;
    onPurchaseCompleted?: (response: any) => void;
    onPurchaseError?: (error: any) => void;
    onPurchaseCancelled?: () => void;
    onRestoreStarted?: () => void;
    onRestoreCompleted?: () => void;
    onRestoreError?: (error: any) => void;
    onDismiss?: () => void;
};

type ApiCallbacks = {
    onPurchaseError?: (error: any) => void;
    onPurchaseCompleted?: (response: any) => void;
};


export const handleBuyProduct = async (sku: Sku, subScriptionId: string, tierId: string, callbacks: Callbacks) => {
    const {
        onPurchaseStarted,
        onPurchaseCompleted,
        onPurchaseError,
        onPurchaseCancelled,
        onDismiss,
    } = callbacks;

    try {
        onPurchaseStarted?.(); // Trigger purchase started callback.

        const product = await handleGetProduct(sku);
        conscentLogger.log('product ==>>', product);

        const purchase = await requestPurchase({ sku });
        conscentLogger.log('purchase ==>>', purchase);

        await veriftRecieptData(purchase, subScriptionId, tierId, {
            onPurchaseError: (error) => onPurchaseError?.(error),
            onPurchaseCompleted: (response) => onPurchaseCompleted?.(response)
        });

        // onPurchaseCompleted?.(purchase); // Trigger purchase completed callback.
    } catch (error) {
        // if (error instanceof PurchaseError) {
        //     onPurchaseError?.(error); // Trigger purchase error callback.
        //     conscentLogger.error({ message: `[${error.code}]: ${error.message}`, error });

        //     // Example: Trigger cancellation callback based on error code.
        //     if (error.code === 'E_USER_CANCELLED') {
        //         onPurchaseCancelled?.(); // Trigger purchase cancelled callback.
        //     }
        // } else {
        conscentLogger.error({ message: 'handleBuyProduct', error });
        //     onDismiss?.(); // Handle dismiss callback for unknown errors.
        // }
    }
};

export const handleGetProduct = async (productId: string) => {
    try {

        const product = await getProducts({ skus: [productId] });
        conscentLogger.log(product);

    } catch (error) {
        conscentLogger.error({ message: 'handleGetProducts', error });
    }
};

export const handleGetProducts = async (productsId: string[]) => {
    try {

        const product = await getProducts({ skus: productsId });
        conscentLogger.log(product);

    } catch (error) {
        conscentLogger.error({ message: 'handleGetProducts', error });
    }
};
export enum PurchaseStateAndroid {
    UNSPECIFIED_STATE = 0,
    PURCHASED = 1,
    PENDING = 2,
}
export interface ProductPurchase {
    productId: string;
    transactionId?: string;
    transactionDate: number;
    transactionReceipt: string;
    purchaseToken?: string;
    //iOS
    quantityIOS?: number;
    originalTransactionDateIOS?: number;
    originalTransactionIdentifierIOS?: string;
    verificationResultIOS?: string;
    appAccountToken?: string;
    //Android
    productIds?: string[];
    dataAndroid?: string;
    signatureAndroid?: string;
    autoRenewingAndroid?: boolean;
    purchaseStateAndroid?: PurchaseStateAndroid;
    isAcknowledgedAndroid?: boolean;
    packageNameAndroid?: string;
    developerPayloadAndroid?: string;
    obfuscatedAccountIdAndroid?: string;
    obfuscatedProfileIdAndroid?: string;
    //Amazon
    userIdAmazon?: string;
    userMarketplaceAmazon?: string;
    userJsonAmazon?: string;
    isCanceledAmazon?: boolean;
}
export const veriftRecieptData = async (product: void | ProductPurchase | ProductPurchase[], subScriptionId: string, tierId: string, apiCallbacks: ApiCallbacks) => {

    const env = await AsyncStorage.getItem(StorageKeys.ApiEnv);
    const ClientId = await AsyncStorage.getItem(StorageKeys.ClientId);
    const baseUrl = getEnvDetails(env);
    const apiUrl = `${baseUrl}api/v2/inapppurchase/google/verifyPayment/${ClientId}`;
    conscentLogger.log(apiUrl)

    const accessToken = await AsyncStorage.getItem(StorageKeys.AccessToken);
    // Extract receipt data safely with type narrowing.
    let receiptData: string | null = null;
    let orderId: string | null = null;
    let packageName: string | null = null;
    let productId: string | null = null;
    let purchaseTime: string | null = null;
    let purchaseState: string | null = null;
    let purchaseToken: string | null = null;
    let quantity: number | null = null;
    let autoRenewing: string | null = null;
    let acknowledged: string | null = null;

    if (!product) {
        conscentLogger.warn('Product is undefined.');
        apiCallbacks.onPurchaseError?.({ message: 'Product is undefined.' })
        return;
    } else if (Array.isArray(product)) {
        // Handle multiple product receipts (if needed).
        receiptData = product.map(p => p.transactionReceipt).join(',');
        orderId = product.map(p => p.transactionId).join(',');
        packageName = product.map(p => p.packageNameAndroid).join(',');
        productId = product.map(p => p.productId).join(',');
        purchaseTime = product.map(p => p.transactionDate).join(',');
        purchaseState = product.map(p => p.purchaseStateAndroid).join(',');
        purchaseToken = product.map(p => p.purchaseToken).join(',');
        quantity = 1;
        autoRenewing = product.map(p => p.autoRenewingAndroid).join(',');
        acknowledged = product.map(p => p.isAcknowledgedAndroid).join(',');
    } else {
        receiptData = product.transactionReceipt;
    }
    const body = JSON.stringify({
        googleIAP: {
            orderId: orderId,
            packageName: packageName,
            productId: productId,
            purchaseTime: purchaseTime,
            purchaseState: 0,
            purchaseToken: purchaseToken,
            quantity: 1,
            autoRenewing: true,
            acknowledged: false
        },
        subScriptionId: "6785fdc03cfb40b0c780953a",
        tierId: "6735212e6b6e5758278f4414",
        type: "SUBSCRIPTION"
    })
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: body,
        });

        const result = await response.json();

        conscentLogger.allLog('backend response ==>>', result);
        conscentLogger.allLog('backend response ==>>', body);
        conscentLogger.allLog('backend response ==>>', accessToken);
        if (response.status == 201) {
            apiCallbacks.onPurchaseCompleted?.(result)
        } else {
            apiCallbacks.onPurchaseError?.(result)
        }



    } catch (error) {
        conscentLogger.error(error);
        apiCallbacks.onPurchaseError?.({ error: error })
    }
}