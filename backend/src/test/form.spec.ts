import { startFastify } from '../http-server/server';
import { fastifyPortOf } from '../repo/config-repo';
import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { tryCatch, match } from 'fp-ts/Either';

describe('Form', () => {
  let server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
  >;

  beforeAll(() => {
    server = startFastify(fastifyPortOf(8888));
  });

  afterAll(() => {
    match(
      e => console.log(e),
      _ => console.log('Closing Fastify server is done!')
    )(tryCatch(
      () => server.close((): void => {}),
      (reason) => new Error(`Failed to close a Fastify server, reason: ${reason}`)
    ));
  });

  it('should successfully get a list of existing forms', async () => {
    const response = await server.inject({ method: 'GET', url: '/v1/forms' });

    // https://docs.nats.io/nats-server/configuration/securing_nats/accounts
    // TODO - need to discuss subscriberId (NATS: users of an account), talk to Nelson
    // for now use UUID for subscriberId
    // TODO - need to make sure if the submitter ID is Windows account
    // there will be another external service for decoding the auth token
    // data Status = Pending | Approved | Rejected
    // TODO - should a `form` be removed?
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(
      JSON.stringify(
        {
          forms: [
            {
              id: 'e8d10038-c433-11eb-822a-ffc573749d39',
              apiId: '11f88b66-c434-11eb-adaa-67fca24f6e0a',
              subscriberId: 'e574022c-c434-11eb-9d7f-9bd525bab798',
              submitUser: 'ywchuo',
              status: 'pending'
            },
            {
              id: 'cff7358a-c435-11eb-81b8-97fc188ac045',
              apiId: 'd7ec04b4-c435-11eb-8a89-f3d20a486deb',
              subscriberId: 'e04df19e-c435-11eb-a00e-e7f42023e9e2',
              submitUser: 'hmchangm',
              status: 'approved'
            }
          ]
        }
      )
    )
  });
});