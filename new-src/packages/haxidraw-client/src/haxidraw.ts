import { intsToBytes } from "./comms/converters";
import { WebSerialPort, createWebSerialPort } from "./comms/webSerialPort";

export class Haxidraw {
    port: WebSerialPort = null!;
    rawPort: SerialPort = null!;

    constructor() {}

    async init(rawPort: SerialPort) {
        this.port = await createWebSerialPort(rawPort);
        this.rawPort = rawPort;
    }

    async servo(angle: number) {
        const bytes = intsToBytes([angle]);
        await this.port.send("servo", bytes);
    }

    close() {
        return this.port.close();
    }
}

export async function createHaxidraw(rawPort: SerialPort) {
    const haxidraw = new Haxidraw();
    await haxidraw.init(rawPort);
    return haxidraw;
}