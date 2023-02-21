import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as assert from 'assert';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.images.length > 0);
        for (let image_metadata of response.body.images) {
          assert(image_metadata.id);
          assert(image_metadata.filename);
          assert(image_metadata.tags);
        }
      })
  });
});
