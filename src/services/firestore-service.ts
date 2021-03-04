import { Firestore, setLogFunction } from '@google-cloud/firestore';

class FirestoreService {
    private db: Firestore;

    constructor() {
        // this.db = new Firestore({
        //     projectId: process.env.PROJECT_ID,
        //     credentials: JSON.parse(process.env.GOOGLE_KEY!),
        // });

        setLogFunction(console.log);

        this.db = new Firestore({
            projectId: 'qwerty',
            host: 'localhost:8080',
            ssl: false,
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
