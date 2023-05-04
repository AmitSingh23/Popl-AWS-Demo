import { Client } from "@opensearch-project/opensearch";
import { Resource } from "../resource/Resource";

export class OpenSearchService {
    // todo: configurize
    static readonly indexName = 'resources';

    private client: Client

    constructor() {
        this.client = new Client({node: `https://${process.env.OPENSEARCH_ENDPOINT}`});
    }

    async writeDocument(message: Resource) {
        await this.client.index({
            id: message.id,
            index: OpenSearchService.indexName,
            body: message,
            refresh: true,
        });
    }

    async getDocuments(from: number, size: number): Promise<Record<string, any>> {
        let response = await this.client.search({
            index: OpenSearchService.indexName,
            body: {
                from: from,
                size: size,
                query: {
                    matchAll: {}
                }
            }
        });

        return response.body
    }
}