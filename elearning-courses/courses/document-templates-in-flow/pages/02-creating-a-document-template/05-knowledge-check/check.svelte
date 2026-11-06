<script module>
  export const pageConfig = { title: 'Knowledge Check',
    quiz: { graded: true, maxAttempts: 3 } };
</script>

<script>
  import { FillInTheBlank, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check</h1>

<MultipleChoice
  id='l1_q1'
  question="You need a membership agreement that prints the member's plan, price and term. What should the template be about?"
  options={['Customer', 'Contract', 'Booking', 'Proposal']}
  correct=1
  correctFeedback='Correct &mdash; a membership agreement is about a Contract, which adds the plan, price and term.'
  incorrectFeedback='Not quite &mdash; only a Contract template can see the plan, price and term. A Customer template has no single contract to point at.'
/>
<MultipleChoice
  id='l1_q2'
  question='Which row command lets you check a template without touching a customer?'
  options={['Preview template', 'Copy template', 'Delete', 'Detach']}
  correct=0
  correctFeedback='Correct &mdash; Preview template generates a document from sample data and downloads it; nothing is sent to a customer.'
  incorrectFeedback='Not quite &mdash; Preview template is the safe rehearsal. It works on every kind of template, Word included.'
/>
<MultipleChoice
  id='l1_q3'
  question='A Word template can be converted into a Designer template at any time.'
  options={['True', 'False']}
  correct=0
  correctFeedback='Correct &mdash; there is no way to turn a Classic (including Word) template into a Designer one. Convert to Designer exists on a Word template but is not available yet.'
  incorrectFeedback='Not quite &mdash; the editor type is fixed at creation for Designer templates, and Classic templates cannot be turned into Designer ones.'
/>
<FillInTheBlank
  id='l1_q4'
  question='An uploaded Word file must be ______ MB or smaller.'
  answers={['10']}
  caseSensitive=false
  correctFeedback='Correct &mdash; anything larger than 10 MB is refused.'
  incorrectFeedback='Not quite &mdash; the limit is 10 MB; a .docx full of images is the usual cause of going over it.'
/>
<MultipleChoice
  id='l1_q5'
  question='Why does the template name matter beyond being a label?'
  options={['It is used for search ranking', 'It becomes the file name of every document generated from it', "It sets the template's Location", 'It determines which editor is used']}
  correct=1
  correctFeedback='Correct &mdash; the name becomes the file name of every generated document, so give it a recognisable name.'
  incorrectFeedback='Not quite &mdash; the name becomes the file name of every document generated from the template.'
/>

