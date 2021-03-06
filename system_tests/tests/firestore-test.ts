import { expect } from 'chai';
import axios from 'axios';

// TODO: Separate config?
const api_base_path: string = process.env.API_BASE_PATH == undefined ? "http://localhost:5000/api" : process.env.API_BASE_PATH;

const log = console.log;    // TODO: Better logging

async function main() {
    let test_value = "test";

    log("Setting test value");
    await axios.get(`${api_base_path}/firestore/set`, {responseType: 'json', params: { value: test_value}});

    log("Getting test value");
    let resp = await axios.get(`${api_base_path}/firestore/get`, {responseType: 'json'});

    expect(resp.data.value).equal(test_value);
}

main().catch((err) => {
    log(err);
    process.exit(1);
});
