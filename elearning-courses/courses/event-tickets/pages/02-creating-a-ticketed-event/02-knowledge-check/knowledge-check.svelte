<script module>
  export const pageConfig = {
    title: 'Knowledge Check',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { FillInTheBlank, Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check</h1>

<MultipleChoice
  id="q1"
  question="Where do operators create a ticketed event?"
  options={['Events > All events', 'Settings > Billing', 'Members > Bookings']}
  correct={0}
  correctFeedback="Correct — events live under Events > All events."
  incorrectFeedback="Not quite — check the Events area of the Admin Panel."
/>

<MultipleChoice
  id="q2"
  question="Capacity limits apply per ticket type."
  options={['True', 'False']}
  correct={0}
  correctFeedback="Correct — each ticket type has its own capacity."
  incorrectFeedback="Review the capacity rules: limits are per ticket type."
/>

<FillInTheBlank
  id="q3"
  question="The toggle that enables ticket sales on the event form is called ______."
  answers={['Sell tickets']}
  caseSensitive={false}
  correctFeedback="Correct."
  incorrectFeedback="It's the Sell tickets toggle on the event form."
/>

<Matching
  id="q4"
  question="Match each ticket concept to its definition."
  pairs={[
    { left: 'Capacity', right: 'Maximum number of tickets of one type' },
    { left: 'Early-bird', right: 'Discounted price before a cutoff date' },
  ]}
  correctFeedback="Well matched."
  incorrectFeedback="Review the ticket type settings."
/>
