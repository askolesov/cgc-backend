import { info } from "./logging-service";

class App {
    public port = parseInt(process.env.PORT as string) || 5000;
}

class Firestore {
    public project_id = process.env.FIRESTORE_PROJECT_ID;
    public credentials = process.env.FIRESTORE_CREDENTIALS;
    public host = process.env.FIRESTORE_HOST;
    public ssl = process.env.FIRESTORE_SSL == undefined ? undefined : process.env.FIRESTORE_SSL.toLowerCase() == 'true';

    public log = process.env.FIRESTORE_LOG == undefined ? false : process.env.FIRESTORE_LOG.toLowerCase() == 'true';
}

class ConfigService {
    public app = new App;
    public firestore = new Firestore();
}

export const configService = new ConfigService();
info(configService);
