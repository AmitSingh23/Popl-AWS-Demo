import { Client } from "@opensearch-project/opensearch";
import { Resource } from "../resource/Resource";

export class OpenSearchService {
    // todo: configurize
    static readonly indexName = 'resources';

    private client: Client

    constructor() {
        console.log('endpoint: ', process.env.OPENSEARCH_ENDPOINT)
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
}