// Backup route for online play: when a direct WebRTC link can't be opened (common between different
// homes / mobile networks, which block direct connections), game messages go through a free public
// MQTT message server over a normal secure WebSocket instead. Slower than direct, but works anywhere.
import mqtt, { type MqttClient } from 'mqtt';

// Tried in order. HiveMQ's public broker kept up with full game traffic in testing; EMQX is the fallback.
const BROKERS = ['wss://broker.hivemq.com:8884/mqtt', 'wss://broker.emqx.io:8084/mqtt'];
const ROOT = 'kitchen-kaiju/v1/';

export const relayTopics = {
  toHost: (code: string) => `${ROOT}${code}/host`,
  toGuest: (code: string, guest: string) => `${ROOT}${code}/g/${guest}`,
};

/** Connects to the first public broker that answers. */
export function connectRelay(timeoutMs = 7000): Promise<MqttClient> {
  return new Promise((resolve, reject) => {
    let i = 0;
    const tryNext = () => {
      if (i >= BROKERS.length) { reject(new Error('relay-unreachable')); return; }
      const c = mqtt.connect(BROKERS[i++], { connectTimeout: timeoutMs, reconnectPeriod: 0, clean: true, keepalive: 20 });
      const fail = () => { c.end(true); tryNext(); };
      const timer = setTimeout(fail, timeoutMs + 500);
      c.once('connect', () => { clearTimeout(timer); c.removeAllListeners('error'); resolve(c); });
      c.once('error', () => { clearTimeout(timer); fail(); });
    };
    tryNext();
  });
}

export function encode(v: unknown): string {
  return JSON.stringify(v);
}
export function decode<T>(buf: Uint8Array | string): T | null {
  try {
    return JSON.parse(typeof buf === 'string' ? buf : new TextDecoder().decode(buf)) as T;
  } catch {
    return null;
  }
}
