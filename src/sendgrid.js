import sendgrid, { mail } from 'sendgrid';
const { Email, Content, Mail } = mail;

import template from './emails/standard';

const to = process.env.DB_TO_EMAIL || 'bceglowski@gmail.com';
const sg = sendgrid(process.env.DB_SENDGRID_API_KEY);

const respond = (res) =>
  ({statusCode, body}) =>
    res.status(statusCode)
      .type('json')
      .send(statusCode === 202 ? JSON.stringify({success: true}) : body);

const createRequest = ({
  from,
  name,
  subject,
  message
}) =>
  sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: new Mail(
      new Email(from),
      subject,
      new Email(to),
      new Content('text/html', template({
        from,
        name,
        subject,
        message
      }))
    ).toJSON()
  });

const send = ({ body }, res) =>
  sg.API(createRequest(body))
    .then(response => respond(res)(response))
    .catch(({response}) => respond(res)(response));

export default send;
