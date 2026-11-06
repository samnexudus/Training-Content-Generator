<script module>
  export const pageConfig = { title: 'Knowledge Check',
    quiz: { graded: true, maxAttempts: 3 } };
</script>

<script>
  import { FillInTheBlank, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check</h1>

<MultipleChoice
  id='l2_q1'
  question='Where do page numbers and page counts belong in a Designer document?'
  options={['In the body', 'In the page header or footer', 'In the outline', 'In the AI tab']}
  correct=1
  correctFeedback='Correct &mdash; headers and footers repeat on every page, so that is where page numbers belong.'
  incorrectFeedback='Not quite &mdash; put a page number in the body and it prints once, in the middle of the text. Use the header or footer.'
/>
<MultipleChoice
  id='l2_q2'
  question='How do you ask whether a customer has any deposits at all?'
  options={["A Show when&hellip; condition with 'is not empty' on the deposits list", 'A Repeat for each&hellip; block', 'A signature line', 'A page break']}
  correct=0
  correctFeedback="Correct &mdash; 'is not empty' on a list is the condition around almost every deposits section."
  incorrectFeedback="Not quite &mdash; use a Show when&hellip; condition with 'is not empty' on the deposits list."
/>
<MultipleChoice
  id='l2_q3'
  question='A field that no longer resolves to your data is a problem that blocks saving.'
  options={['True', 'False']}
  correct=1
  correctFeedback='Correct &mdash; an unknown field is a problem, so Save is refused until you re-pick the field.'
  incorrectFeedback='Not quite &mdash; an unknown field is a problem and blocks saving until you fix it.'
/>
<MultipleChoice
  id='l2_q4'
  question='A document is sent for e-signature to three people but the design has only two signature lines. What happens?'
  options={['The third person cannot sign', 'Dropbox Sign appends its own signature page for the missing signer', 'The document fails to render', 'The third signer is silently skipped']}
  correct=1
  correctFeedback='Correct &mdash; a signer with no line still signs; Dropbox Sign adds its own signature page for them.'
  incorrectFeedback='Not quite &mdash; the missing signer still signs, on an extra signature page Dropbox Sign appends.'
/>
<MultipleChoice
  id='l2_q5'
  question="You want to check what an actual customer's document will look like, including an empty company name. Which preview option do you use?"
  options={['Sample data', 'A real record', 'View source', 'Preview template on the list']}
  correct=1
  correctFeedback="Correct &mdash; a real record is the only way to see what an actual customer's document looks like when a field is empty."
  incorrectFeedback='Not quite &mdash; sample data fills every field, so it hides empties. Use a real record, ideally an awkward one.'
/>
<FillInTheBlank
  id='l2_q6'
  question='The button in the Designer header that renders the real file and reports how many signature fields were placed is the ______ preview.'
  answers={['PDF']}
  caseSensitive=false
  correctFeedback='Correct &mdash; the PDF preview renders the real thing and reports the signature field count.'
  incorrectFeedback='Not quite &mdash; it is the PDF preview, not the Page preview, that settles page breaks and signature placement.'
/>

