<script module>
  export const pageConfig = { title: 'Writing in the Document Designer' };
</script>

<script>
  import { Accordion, AccordionItem, Callout } from 'tessera-learn';
</script>

<h1>Writing in the Document Designer</h1>

<h2>Conditions and repeats</h2>
<p>One agreement has to cover the customer with a deposit and the one without. Two blocks do that:</p>
<Accordion>
  <AccordionItem title='Show when&hellip;'>
<p>Wraps content in a rule. When the rule is true the content prints; when it is false, whatever is under <strong>Otherwise</strong> prints instead. <strong>Match</strong> is <strong>all of these</strong> or <strong>any of these</strong>. <strong>is not empty</strong> on a list is how you ask &ldquo;does this customer have any deposits at all?&rdquo;</p>
  </AccordionItem>
  <AccordionItem title='Repeat for each&hellip;'>
<p>Prints its content once per item in a list (deposits, products, guests). <strong>Call each item</strong> names the fields inside the block &mdash; with the name <code>deposit</code>, the field is <strong>deposit &rsaquo; Name</strong>. An empty branch covers what prints when the list has nothing in it.</p>
  </AccordionItem>
  <AccordionItem title='Repeating table rows'>
<p>A table can repeat one row per item instead of wrapping the whole table. <strong>Repeat rows&hellip;</strong> marks one row as the template row &mdash; a header row that stays put and a body row that multiplies. This is what a deposits or products table wants.</p>
  </AccordionItem>
</Accordion>
<h2>Signature lines</h2>
<p>A signature line is a block like any other: insert it where people sign and say who it belongs to. <strong>Signer number</strong> matters &mdash; the customer is always signer 1, and additional signatories follow in the order they are listed on the customer file. One signer usually needs more than one block (a signature and a date beside it); give both the same signer number.</p>
<Callout type="warning">
<p>A signer with no line still signs &mdash; somewhere you did not choose. A document sent to three people with two lines comes back with an extra signature page appended. Check the Signatures summary at the foot of the outline against who will actually be asked to sign.</p>
</Callout>

