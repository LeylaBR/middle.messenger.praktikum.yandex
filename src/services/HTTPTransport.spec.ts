import { expect } from 'chai';
import sinon from 'sinon';
import HTTPTransport, { BASE_URL, METHODS } from './HTTPTransport';

describe('HTTP Transport', () => {
  let http: HTTPTransport;

  beforeEach(() => {
    http = new HTTPTransport();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Метод get с query params', async () => {
    const requestStub = sinon.stub(http, 'request').resolves();

    await http.get('/test', {
      data: {
        a: '1',
        b: '203',
      },
    });

    const expectedUrl: string = `${BASE_URL}/test?a=1&b=203`;

    const isCalledWithExpectedUrl = requestStub.calledWithMatch(expectedUrl, {
      method: METHODS.GET,
    });

    expect(isCalledWithExpectedUrl).to.be.true;
  });

  it('Метод POST c FormData', async () => {
    const requestStub = sinon.stub(http, 'request').resolves();
    const formData = new FormData();
    formData.append('file', 'example.pdf');

    await http.post('/upload', { data: formData });

    const isCalledWithExpectedUrl = requestStub.calledWithMatch(
      `${BASE_URL}/upload`,
      {
        method: METHODS.POST,
        data: formData,
      }
    );

    expect(isCalledWithExpectedUrl).to.be.true;
  });

  it('Обработка ошибки таймаута', async () => {
    sinon.stub(http, 'request').rejects(new Error('Request timed out'));

    try {
      await http.get('/timeout', { timeout: 1000 });
    } catch (error: any) {
      expect(error.message).to.equal('Request timed out');
    }
  });
});
