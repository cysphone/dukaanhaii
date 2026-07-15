export interface WhatsAppMessageImage {
  id: string;
  mime_type?: string;
  sha256?: string;
}

export interface WhatsAppMessageText {
  body: string;
}

export interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: WhatsAppMessageText;
  image?: WhatsAppMessageImage;
}

export interface WhatsAppChangeValue {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: Array<{
    profile: {
      name: string;
    };
    wa_id: string;
  }>;
  messages?: WhatsAppMessage[];
}

export interface WhatsAppChange {
  value: WhatsAppChangeValue;
  field: string;
}

export interface WhatsAppEntry {
  id: string;
  changes: WhatsAppChange[];
}

export interface WhatsAppWebhookPayload {
  object: string;
  entry: WhatsAppEntry[];
}

export interface HandlerContext {
  phoneNumber: string;
  text: string;
  msgUpper: string;
  session: any;
  existingUser: any;
  existingBusiness: any;
  templateCat?: string;
  isService: boolean;
  itemWord: string;
  isTimeout: boolean;
  message: WhatsAppMessage;
}

export interface HandlerResponse {
  handled: boolean;
  replyText?: string;
  nextStep?: string;
  collectedData?: any;
}
