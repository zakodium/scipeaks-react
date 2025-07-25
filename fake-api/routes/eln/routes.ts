import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { FastifyInstance, FastifyReply } from 'fastify';

import fakeToc from './fakeToc.json' with { type: 'json' };

export function elnRoutes(fastify: FastifyInstance) {
  fastify.get('/_query/sample_toc', () => {
    return fakeToc;
  });

  fastify.get<{ Params: { sampleId: string } }>(
    // TODO: rest-on-couch-client should not make a request with a trailing slash here.
    '/entry/:sampleId/',
    async (request, reply) => {
      const { sampleId } = request.params;

      try {
        const sampleData = await readFile(
          join(import.meta.dirname, 'samples', sampleId, 'sample.json'),
        );
        reply.header('content-type', 'application/json').send(sampleData);
      } catch (error) {
        if (error.code === 'ENOENT') {
          return notFound(reply);
        }
        throw error;
      }
    },
  );

  fastify.get<{
    Params: { sampleId: string; spectrumKind: string; filename: string };
  }>(
    '/entry/:sampleId/spectra/:spectrumKind/:filename',
    async (request, reply) => {
      const { sampleId, spectrumKind, filename } = request.params;

      try {
        const attachment = await readFile(
          join(
            import.meta.dirname,
            'samples',
            sampleId,
            'spectra',
            spectrumKind,
            filename,
          ),
        );
        reply.status(200).send(attachment);
      } catch (error) {
        if (error.code === 'ENOENT') {
          return notFound(reply);
        }
        throw error;
      }
    },
  );
}

function notFound(reply: FastifyReply) {
  return reply.status(404).send({
    error: 'document not found',
    code: 'not found',
  });
}
