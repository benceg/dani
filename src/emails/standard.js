const styles = {
  wrapper: 'max-width: 640px; margin: 0 auto;',
  value:  'padding: 1em; border-bottom: 1px solid #efefef;',
  message:  'padding: 1em;'
};

const template = ({
  from = '',
  name = '',
  subject = '',
  message = ''
}) =>

`
<div style="${styles.wrapper}">
  <div style="${styles.value}"><b>From</b>: ${name} &lt;<a href="mailto:${from}">${from}</a>&gt;</div>
  <div style="${styles.value}"><b>Subject</b>: ${subject}</div>
  <div style="${styles.message}">${message.replace("\n", '<br /><br />')}</div>
</div>
`

export default template;
