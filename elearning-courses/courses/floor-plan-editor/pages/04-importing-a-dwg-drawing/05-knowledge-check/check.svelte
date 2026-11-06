<script module>
  export const pageConfig = { title: 'Knowledge Check',
    quiz: { graded: true, maxAttempts: 3 } };
</script>

<script>
  import { FillInTheBlank, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check</h1>

<MultipleChoice
  id='l3_q1'
  question='You can import a DWG into a floor plan that already has content.'
  options={['True', 'False']}
  correct=0
  correctFeedback='Correct — the importer refuses if the layout already has content. Use a new, empty floor plan.'
  incorrectFeedback='The importer refuses with “This floor plan already has content” — create a new plan for the drawing.'
/>
<MultipleChoice
  id='l3_q2'
  question='Which layer role produces the areas that become your units?'
  options={['Room boundary', 'Wall boundaries', 'Tracing only']}
  correct=0
  correctFeedback='Correct — Room boundary layers become areas, which become your units.'
  incorrectFeedback='Walls come from wall layers; areas come from the Room boundary role.'
/>
<FillInTheBlank
  id='l3_q3'
  question='The maximum file size for a DWG upload is ______ MB.'
  answers={['25', '25 MB']}
  caseSensitive=false
  correctFeedback='Correct — 25 MB.'
  incorrectFeedback='Check the upload step in the import workflow.'
/>
<MultipleChoice
  id='l3_q4'
  question='The conversion applies successfully but the plan has walls and no areas. What is the most likely cause?'
  options={['No layer was given the Room boundary role', 'The file was too large', 'The grid snapping was turned on']}
  correct=0
  correctFeedback='Correct — areas come from Room boundary layers, so go back to Map content.'
  incorrectFeedback='Areas are built from Room boundary layers — check the layer roles in Map content.'
/>
<MultipleChoice
  id='l3_q5'
  question='A converted area can be assigned to a customer as soon as it appears in the editor.'
  options={['True', 'False']}
  correct=0
  correctFeedback='Correct — a converted area is a shape until it is linked to a floor plan unit.'
  incorrectFeedback='Name the areas and link each to a floor plan unit first — a shape with no unit is decoration.'
/>
<MultipleChoice
  id='l3_q6'
  question='You applied a conversion but forgot to save. What happens when you leave the page?'
  options={['The conversion is saved automatically', 'The conversion is lost', 'The conversion is queued for later']}
  correct=1
  correctFeedback='Correct — nothing is stored until you choose Save in the editor.'
  incorrectFeedback='Nothing is saved until you choose Save — leaving the page after applying loses the conversion.'
/>

