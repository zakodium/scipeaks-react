import fastify from 'fastify';

import { authRoutes } from './routes/auth.ts';
import { elnRoutes } from './routes/eln/routes.ts';

const server = fastify({ logger: true });

server.register(authRoutes, { prefix: '/fake-roc' });
server.register(elnRoutes, { prefix: '/fake-roc/db/eln' });

await server.listen({ port: 3333 });
