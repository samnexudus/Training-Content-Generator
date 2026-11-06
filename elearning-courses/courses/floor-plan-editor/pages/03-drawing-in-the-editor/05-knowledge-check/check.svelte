<script module>
  export const pageConfig = { title: 'Knowledge Check',
    quiz: { graded: true, maxAttempts: 3 } };
</script>

<script>
  import { FillInTheBlank, Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check</h1>

<MultipleChoice
  id='l2_q1'
  question='You want to know what is free on a floor in March. What do you do?'
  options={['Change the date in the View availability header picker', 'Open each contract and check the dates', 'Ask members to email their bookings']}
  correct=0
  correctFeedback='Correct — occupancy is worked out for the date in the header picker, from contracts and proposals.'
  incorrectFeedback='Use the date picker in View availability — occupancy is calculated for the chosen date.'
/>
<FillInTheBlank
  id='l2_q2'
  question='In the availability legend, the colour for a unit that is occupied is ______.'
  answers={['red', 'Red']}
  caseSensitive=false
  correctFeedback='Correct — red means occupied.'
  incorrectFeedback='Green is available, blue is reserved later, yellow is proposed — which one is occupied?'
/>
<MultipleChoice
  id='l2_q3'
  question='You should rescale the plan after you have finished drawing, once all areas are placed.'
  options={['True', 'False']}
  correct=0
  correctFeedback='Correct — rescale before drawing in earnest, because unit areas feed occupancy reporting and target price per square metre.'
  incorrectFeedback='Do it early: a plan scaled afterwards moves numbers you may already have reported.'
/>
<MultipleChoice
  id='l2_q4'
  question='A colleague saved the floor plan while you were editing. When you save, what happens?'
  options={['Your versions are merged automatically', 'Nexudus names who changed it and offers overwrite, keep editing, or reload latest', 'Your save is silently rejected']}
  correct=1
  correctFeedback='Correct — there is no merge; you choose which single version survives.'
  incorrectFeedback='There is no merge — you get a choice of overwrite, keep editing, or reload latest and discard your changes.'
/>
<Matching
  id='l2_q5'
  question='Match each keyboard shortcut to what it does.'
  pairs={[{ left: 'Ctrl + G', right: 'Toggles the grid on or off' }, { left: 'Ctrl + F', right: 'Zooms to fit' }, { left: 'Esc', right: 'Returns to the select tool' }, { left: 'Delete', right: 'Deletes the selection' }]}
  correctFeedback='Well matched.'
  incorrectFeedback='Check the Keyboard shortcuts panel in the editor.'
/>
<MultipleChoice
  id='l2_q6'
  question='You draw a new area. What must happen before it can be assigned to a customer or booked?'
  options={['It must be linked to a floor plan unit', 'It must be coloured green', 'It must be saved twice']}
  correct=0
  correctFeedback='Correct — a shape with no unit is decoration; a unit with a shape can be assigned, booked and reported on.'
  incorrectFeedback='Use Assign floor plan unit to link the shape to a unit — then it can be assigned or booked.'
/>

