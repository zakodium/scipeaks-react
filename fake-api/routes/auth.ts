import type { FastifyInstance } from 'fastify';

export function authRoutes(fastify: FastifyInstance) {
  fastify.get('/session', () => {
    return {
      ok: true,
      username: 'anonymous',
      admin: false,
      provider: null,
      authenticated: false,
    };
  });
}
