/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import axios from 'axios';
/* eslint-enable import/no-extraneous-dependencies */

// TODO: Separate config?
const apiBasePath: string =
    process.env.API_BASE_PATH === undefined ? 'http://localhost:5000/api' : process.env.API_BASE_PATH;

const { log } = console; // TODO: Better logging

class Resp {
    public value: string | undefined;
}

async function main() {
    const testValue = 'test';

    log('Setting test value');
    await axios.get(`${apiBasePath}/firestore/set`, { responseType: 'json', params: { value: testValue } });

    log('Getting test value');
    const resp = await axios.get<Resp>(`${apiBasePath}/firestore/get`, { responseType: 'json' });

    expect(resp.data.value as string).equal(testValue);
}

main().catch(error => {
    log(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
});
