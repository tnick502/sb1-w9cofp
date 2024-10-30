import { PrintifyAuth, PrintifyStore } from '@/types/printify';

const PRINTIFY_API_URL = 'https://api.printify.com/v1';

export class PrintifyClient {
  private apiKey: string;
  private storeId: string | null;

  constructor(auth: PrintifyAuth) {
    this.apiKey = auth.apiKey;
    this.storeId = auth.selectedStoreId;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${PRINTIFY_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Printify API error: ${response.statusText}`);
    }

    return response.json();
  }

  async validateApiKey(): Promise<boolean> {
    try {
      await this.getStores();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getStores(): Promise<PrintifyStore[]> {
    return this.fetch('/shops');
  }

  async getProducts(page = 1, limit = 100) {
    if (!this.storeId) throw new Error('Store ID not set');
    return this.fetch(`/shops/${this.storeId}/products?page=${page}&limit=${limit}`);
  }

  async uploadDesign(file: File) {
    if (!this.storeId) throw new Error('Store ID not set');
    
    // Get upload URL
    const { url } = await this.fetch('/uploads/images', {
      method: 'POST',
      body: JSON.stringify({
        file_name: file.name,
        type: file.type,
      }),
    });

    // Upload file
    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
  }
}