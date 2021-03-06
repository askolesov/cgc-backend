import { Firestore, setLogFunction } from '@google-cloud/firestore';
import { configService } from './config-service';

class FirestoreService {
    private db: Firestore;

    constructor() {
        if (configService.firestore.log) {
            setLogFunction(console.log);
        }

        this.db = new Firestore({
            projectId: configService.firestore.project_id,
            host: configService.firestore.host,
            ssl: configService.firestore.ssl,
        });
    }

    public async setTestValue(value: string) {
        const document = this.db.collection('testCollection').doc('testDoc');

        await document.set({
            value,
        });
    }

    public async getTestValue(): Promise<string> {
        const document = this.db.collection('testCollection').doc('testDoc');

        return (await document.get()).data()?.value as string;
    }
}

export const firestoreService = new FirestoreService();
