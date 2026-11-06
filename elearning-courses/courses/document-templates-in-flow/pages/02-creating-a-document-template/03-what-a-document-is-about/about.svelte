<script module>
  export const pageConfig = { title: 'Creating a document template' };
</script>

<script>
  import { Accordion, AccordionItem, Callout } from 'tessera-learn';
</script>

<h1>Creating a document template</h1>

<h2>What a document is about</h2>
<p>Every template names one thing it is about, and that single choice decides three things at once: <strong>which fields exist</strong>, <strong>which record the preview uses</strong>, and <strong>which starters you are offered</strong>. The customer and the location are available in all four; the rest is added by the choice.</p>
<Accordion>
  <AccordionItem title='Customer'>
<p>General documents for a customer: their details, company, team and your location. It has no single contract to point at, so it cannot print a plan name, price or start date.</p>
  </AccordionItem>
  <AccordionItem title='Contract'>
<p>Agreements for a customer contract: the plan, price, term, deposits and products, plus the customer. A membership agreement is about a Contract, not a Customer.</p>
  </AccordionItem>
  <AccordionItem title='Proposal'>
<p>Documents sent with or signed for a proposal: its products, plans, totals and validity, plus the customer.</p>
  </AccordionItem>
  <AccordionItem title='Booking'>
<p>Confirmations for a booking: the resource, times, guests, extras and cost, plus the customer.</p>
  </AccordionItem>
</Accordion>
<Callout type="warning">
<p>Choosing the wrong one is the commonest reason a template cannot say what you want. Pick Customer and the plan, price and term are not in the field list at all. Ask which single record the document is generated from, and match the choice to it.</p>
</Callout>

