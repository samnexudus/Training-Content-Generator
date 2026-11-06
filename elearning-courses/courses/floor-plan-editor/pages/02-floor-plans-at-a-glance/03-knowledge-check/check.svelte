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
  question='Where do you find floor plans in Nexudus Flow?'
  options={['Settings & administration › Administration › Floor plans', 'Reports › Dashboards', 'Inbox › Conversations']}
  correct=0
  correctFeedback='Correct — floor plans live under Settings & administration › Administration.'
  incorrectFeedback='Not quite — look under Settings & administration › Administration.'
/>
<MultipleChoice
  id='l1_q2'
  question='You can copy a floor plan without copying its desks and offices.'
  options={['True', 'False']}
  correct=1
  correctFeedback='Correct — the copy dialog lets you untick desks and offices to get just the shell of the floor.'
  incorrectFeedback='Think again — the copy dialog asks what to bring, and you can untick desks and offices.'
/>
<FillInTheBlank
  id='l1_q3'
  question="The action on a plan's row that opens the drawing tools is called ______."
  answers={['Open Floor Plan Editor']}
  caseSensitive=false
  correctFeedback='Correct — Open Floor Plan Editor takes you straight into the editor.'
  incorrectFeedback='Look at the row actions on a plan that has been drawn in the editor.'
/>
<MultipleChoice
  id='l1_q4'
  question='What happens to the units on a floor plan when you delete it?'
  options={['They are moved to a new plan automatically', 'They are deleted too, and cannot be recovered', 'They are kept as orphans until you reassign them']}
  correct=1
  correctFeedback='Correct — every unit on the plan is deleted, and contracts and bookings pointing at them lose them.'
  incorrectFeedback='Deleting a plan deletes every unit on it — there is no recovery.'
/>
<MultipleChoice
  id='l1_q5'
  question="The floor plan record holds the plan's geometry (walls and rooms)."
  options={['True', 'False']}
  correct=0
  correctFeedback='Correct — the record holds the name, background image and booking limit; the geometry belongs to the editor.'
  incorrectFeedback='The record holds name, background image and booking limit. The geometry lives in the editor.'
/>

