export interface PrintifyStore {
  id: string;
  title: string;
  sales_channel: string;
}

export interface PrintifyAuth {
  apiKey: string;
  selectedStoreId: string | null;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  blueprint_id: string;
  variants: PrintifyVariant[];
  images: PrintifyImage[];
  cost: {
    value: number;
    currency: string;
  };
  shipping: {
    handling_time: {
      value: number;
      unit: string;
    };
    profiles: {
      id: string;
      title: string;
      regions: string[];
    }[];
  };
}

export interface PrintifyVariant {
  id: string;
  title: string;
  options: {
    color: string;
    size: string;
  };
  price: number;
}

export interface PrintifyImage {
  id: string;
  file_name: string;
  preview_url: string;
  position: number;
}